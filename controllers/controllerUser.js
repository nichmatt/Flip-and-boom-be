const midtrandClient = require('midtrans-client')
const { User, sequelize, TransactionHistory } = require("../models");
const { comparePassword, signToken } = require("../helpers");

class ControllerUser {

  static async register(req, res, next) {
    try {
      const { email, password, username } = req.body;

      await User.create({
        email,
        password,
        username
      });

      res.status(201).json({
        statusCode: 201,
        msg: "User Created",
      });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if(!email) throw { name : 'Invalid Email/Password'}
      if(!password) throw { name : 'Invalid Email/Password'}

      const userLogged = await User.findOne({
        where: { email },
      });

      if (!userLogged) throw { name: "Invalid Email/Password" };
      
      if (!comparePassword(password, userLogged.password)) throw { name: "Wrong password" };

      const access_token = signToken({
        id: userLogged.id,
        username: userLogged.username,
        email: userLogged.email,
      });

      res.status(200).json({
        statusCode: 200,
        access_token,
      });

    } catch (err) {
      console.log(err, 'err login');
      next(err);
    }
  }

  static async getProfile(req, res, next) {
    try {
      const { id } = req.user;
      const dataProfile = await User.findByPk(id, {
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],

        },
      });

      if (!dataProfile) {
        throw { name: "Login First" };
      }

      res.status(200).json({
        user: dataProfile,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { char = "basic", skin = "basic" } = req.body;
      const { id } = req.user;

      const data = await User.findByPk(id);

      data.set({
        selectedChar: char,
        selectedSkin: skin,
      });

      await data.save();
      res.status(200).json("Updated");
    } catch (err) {
      console.log(err);
    }
  }

  static async generateTokenMidtrans(req, res, next) {
    try {

      const { amount } = req.body
      if(!amount) throw { name: 'failed, amount is require'}

      const logedUser = await User.findOne({where:{email: req.user.email}})
      // initialize midtrans
      const snap = new midtrandClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY
      })

      const date = new Date()
      let options = {
        "transaction_details": {
          "order_id": 'Ordre-' + Math.ceil(Math.random() * 1000) + '-' + date.getTime(),
          "gross_amount": amount
        },
        "credit_card": {
          "secure": true
        },
        "customer_details": {
          "first_name": 'jajang',
          "email": 'nugraha@mail.com',
          "order_date": new Date()
        }
      };
      const responseMidtrans = await snap.createTransaction(options)

      res.status(200).json(responseMidtrans)
    } catch (error) {
      next(error)
    }
  }

  static async topupBalance(req, res, next) {
    const trans = sequelize.transaction()
    try {
      const { amount, status, orderId } = req.body;
      const findedUser = await User.findByPk(req.user.id);

      if (status === 'success') {
        await User.update({ balance: findedUser.balance + amount, }, { where: { id: req.user.id } }, { transaction: trans })
        await TransactionHistory.create({ UserId: req.user.id, OrderId: orderId, amount, status, name: findedUser.username, type: 'topup-midtrans' }, { transaction: trans })
        res.status(201).json({ message: 'topup success' })
        await trans.commit()
      } else {
        await TransactionHistory.create({ UserId: req.user.id, OrderId: orderId, amount, status, name: findedUser.username, type: 'topup-midtrans' }, { transaction: trans })
        res.status(201).json({ message: 'topup failed', })
        await trans.commit()
      }
    } catch (error) {
      next(error)
      await trans.rollback();
    }
  }

  static async updateScore(req, res, next) {
    try {
      const { difficulty, score } = req.body;
      const { id } = req.user;
      const data = await User.findByPk(id);

      if (difficulty === "easy") {
        if (data.easyScore < score) {
          data.easyScore = score;
        }
      } else if (difficulty === "medium") {
        if (data.mediumScore < score) {
          data.mediumScore = score;
        }
      } else if (difficulty === "hard") {
        if (data.hardScore < score) {
          data.hardScore = score;
        }
      } else {
        if (data.impossibleScore < score) {
          data.impossibleScore = score;
        }
      }

      await data.save();
      res.status(200).json("Score Updated");
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
}

module.exports = { ControllerUser };

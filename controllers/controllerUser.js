const midtrandClient = require('midtrans-client')
const { User, Profile, sequelize, TransactionHistory } = require("../models");
const { comparePassword, signToken } = require("../helpers");

class ControllerUser {

  static async register(req, res, next) {
    try {
      const { email, password, username } = req.body;

      const dataUser = await User.create({
        email,
        password,
      });

      res.status(201).json({
        statusCode: 201,
        msg: "User Created",
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const data = await User.findOne({
        where: { email },
      });

      if (!data) {
        throw { name: "Invalid Email/Password" };
      }

      const passwordValid = comparePassword(password, data.password);

      if (!passwordValid) {
        throw { name: "Wrong password" };
      } else {
        const profile = await Profile.findByPk(data.id);
        const access_token = signToken({
          id: data.id,
          username: profile.username,
          email: data.email,
        });

        res.status(200).json({
          statusCode: 200,
          access_token,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getProfile(req, res, next) {
    try {
      const { id } = req.user;
      const dataProfile = await Profile.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt", "UserId"],
        },
      });

      if (!dataProfile) {
        throw { name: "Login First" };
      }

      res.status(200).json({
        data: dataProfile,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      // const {} = req.body;
    } catch (err) {
      console.log(err);
    }
  }

  static async generateTokenMidtrans(req, res, next) {
    try {

      const { amount } = req.body
      // const findUser = await User.findByPk(req.user.id)

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
}

module.exports = { ControllerUser };

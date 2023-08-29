const midtrandClient = require("midtrans-client");
const {
  User,
  sequelize,
  TransactionHistory,
  Inventory,
  Item,
} = require("../models");

const { comparePassword, signToken } = require("../helpers");

class ControllerUser {
  static async register(req, res, next) {
    try {
      const { email, password, username } = req.body;

      const newUser = await User.create({
        email,
        password,
        username,
      });

      const itemDefault = await Item.findAll({where: {name: 'default'}})
    
      await Inventory.create({UserId: newUser.id, ItemId: itemDefault[0].id})
      await Inventory.create({UserId: newUser.id, ItemId: itemDefault[1].id})

      res.status(201).json({
        statusCode: 201,
        message: "User Created",
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: "Invalid Email/Password" };
      if (!password) throw { name: "Invalid Email/Password" };

      const userLogged = await User.findOne({
        where: { email },
      });

      if (!userLogged) throw { name: "Invalid Email/Password" };

      if (!comparePassword(password, userLogged.password))
        throw { name: "Wrong password" };

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
      next(err);
    }
  }

  static async getProfile(req, res, next) {
    try {
      const { id } = req.user;

      const data = await User.findByPk(id, {
        include: {
          model: Inventory,
          attributes: {
            exclude: ["id", "createdAt", "updatedAt"],
          },
          include: {
            model: Item,
            attributes: {
              exclude: ["id", "createdAt", "updatedAt"],
            },
          },
        },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      });

      res.status(200).json(data);
    } catch (err) {
      next(err);
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
      res.status(200).json({ message: "Success Updated" });
    } catch (error) {
      next(error);
    }
  }

  static async generateTokenMidtrans(req, res, next) {
    try {
      const { amount } = req.body;
      if (!amount) throw { name: "failed, amount is require" };

      const logedUser = await User.findOne({
        where: { email: req.user.email },
      });
      // initialize midtrans
      const snap = new midtrandClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      const date = new Date();
      let options = {
        transaction_details: {
          order_id:
            "Ordre-" + Math.ceil(Math.random() * 1000) + "-" + date.getTime(),
          gross_amount: amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          username: logedUser.username,
          email: logedUser.email,
          order_date: new Date(),
        },
      };
      const responseMidtrans = await snap.createTransaction(options);

      res.status(200).json(responseMidtrans);
    } catch (error) {
      next(error);
    }
  }

  static async topupBalance(req, res, next) {

    const trans = await sequelize.transaction();
    try {
      const { amount, topupBalance, status, orderId } = req.body;
      if(!orderId) throw {name: 'not valid transaction'}
      if (status !== 'success' && status !== 'cancel') throw { name: 'transaction failed' }
      const findedUser = await User.findByPk(req.user.id);
      if (status === "success") {
        await User.update(
          { balance: findedUser.balance + topupBalance },
          { where: { id: req.user.id } },
          { transaction: trans }
        );
      }

      await TransactionHistory.create(
        {
          UserId: findedUser.id,
          OrderId: orderId,
          amount,
          status,
          name: findedUser.username,
          type: "topup-midtrans",
        },
        { transaction: trans }
      );
      await trans.commit();
      res.status(201).json({ message: `topup ${status}` });
    } catch (error) {
      await trans.rollback();
      console.log(error.name, 'name error');
      next(error);
    }
  }

  static async updateScore(req, res, next) {
    try {
      const { difficulty, score } = req.body;
      const { id } = req.user;
      const data = await User.findByPk(id);

      if (data[`${difficulty}Score`] < score) {
        data[`${difficulty}Score`] = score;

        await data.save();
        res.status(200).json({ message: "Success update" });

      } else {
        res.status(304).end();
      }
      await data.save();
      res.status(200).json("Score Updated");
    } catch (error) {
      next(error);
    }
  }

  static async buyItem(req, res, next) {
    try {
      const { ItemId } = req.body;
      const { id } = req.user;

      const item = await Item.findByPk(ItemId);
      const user = await User.findByPk(id);

      if (user.balance < item.price) {
        throw { name: "Not enough balance" };
      }

      user.balance = user.balance - item.price;
      user.save();

      await Inventory.create({
        UserId: id,
        ItemId,
      });

      res.status(201).json({
        message: "Success Buy Item",
      });
    } catch (error) {
      next(error);
    }
  }

  static async getLeaderboard(req, res, next) {
    try {
      const { difficulty } = req.query;
      if (!difficulty) throw { name: "difficulty is require in query" };

      let choice = difficulty + "Score";
      let option = {
        order: [[choice, "desc"]],
        limit: 5,
        attributes: ["username", choice, "createdAt"],
      };

      const leaderboard = await User.findAll(option);

      res.status(200).json(leaderboard);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { ControllerUser };

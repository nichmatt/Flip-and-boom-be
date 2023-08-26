const midtrandClient = require('midtrans-client')
const { User, Profile } = require("../models");
const { comparePassword, signToken } = require("../helpers");

class ControllerUser {

  static async register(req, res, next) {
    try {
      const { email, password, username } = req.body;

      const dataUser = await User.create({
        email,
        password,
      });

      await Profile.create({
        username,
        UserId: dataUser.id,
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

  static async topupBalance(req, res, next){
    try {
      const { amount } = req.body
      const findUser = await User.findByPk(req.user.id)

      // initialize midtrans
      const spap = new midtrandClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY
      })

      let parameter = {
        "transaction_details": {
            "order_id": 'Ordre-'+ Math.ceil(Math.random() * 1000),
            "gross_amount": amount
        },
        "credit_card": {
            "secure": true
        },
        "customer_details": {
            "first_name": findUser.username,
            "email": findUser.email,
            "order_date": new Date()
        }
    };

    } catch (error) {
      next(error)
    }
  }
}

module.exports = { ControllerUser };

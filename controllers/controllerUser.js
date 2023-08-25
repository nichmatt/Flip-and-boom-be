const { User, Profile } = require("../models");
const { comparePassword, signToken } = require("../helpers/");

class ControllerUser {
  static async register(req, res, next) {
    try {
      const { email, password, username } = req.body;

      const dataUser = await User.create({
        email,
        password,
      });

      const dataProfile = await Profile.create({
        username,
        UserId: dataUser.id,
      });

      res.status(201).json({
        statusCode: 201,
        msg: "User Created",
      });
    } catch (err) {
      console.log(err);
      next(err)
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
        const token = signToken({
          id: data.id,
          email: data.email,
        });

        const payloadRes = {
          id: data.id,
          username: data.username,
          email: data.email
        }
        
        res.status(200).json({
          statusCode: 200,
          token,
          user: payloadRes
        });
      }
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
}

module.exports = { ControllerUser };

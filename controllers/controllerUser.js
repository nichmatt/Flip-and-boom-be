const { User, Item } = require("../models");
const { comparePassword, signToken } = require("../helpers");

class ControllerUser {
  static async register(req, res, next) {
    try {
      const { email, password, username } = req.body;
      await User.create({
        email,
        password,
        username,
      });

      res.status(201).json({
        statusCode: 201,
        msg: "User Created",
      });
    } catch (err) {
      console.log(err, "123");
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
        const access_token = signToken({
          id: data.id,
          username: data.username,
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
      const data = await User.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      if (!dataProfile) {
        throw { name: "Login First" };
      }

      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const { char = "basic", skin = "basic" } = req.body;
      const { id } = req.user;

      const data = await User.findByPk(id);

      data.set({
        selectedChar: char,
        selectedSkin: skin,
      });

      await data.save();
    } catch (err) {
      console.log(err);
    }
  }

  static async getItems(req, res, next) {
    try {
      const data = await Item.findAll();

      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  }

  static async getInventory(req, res, next) {
    try {
      const { id } = req.user;
      const data = await User.findByPk(id, {
        include: [
          {
            model: Item,
            required: true,
          },
        ],
      });

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = { ControllerUser };

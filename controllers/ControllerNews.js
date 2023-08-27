const { News } = require("../models");

class ControllerNews {
  static async getNews(req, res, next) {
    try {
      const data = await News.findAll();

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  static async postNews(req, res, next) {
    try {
      const { title, text } = req.body;

      await News.create({
        title,
        text,
      });

      res.status(201).json({
        msg: "News Posted",
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = { ControllerNews };

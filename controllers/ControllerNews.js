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
}

module.exports = { ControllerNews };

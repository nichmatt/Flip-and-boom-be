const { News } = require("../models");

class ControllerNews {
  static async getNews(req, res) {
      const data = await News.findAll();
      res.status(200).json(data);
  }
}

module.exports = { ControllerNews };

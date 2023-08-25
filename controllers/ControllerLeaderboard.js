const { Leaderboard } = require("../models");

class ControllerLeaderboard {
  static async getLB(req, res, next) {
    try {
      const data = await Leaderboard.findAll();

      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  }

  static async updateLB(req, res, next) {
    try {
      const { type, score } = req.body;

      const data = await Leaderboard.findAll();
      res.status(200).json(data[4]);
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = { ControllerLeaderboard };

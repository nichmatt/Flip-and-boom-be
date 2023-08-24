"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Leaderboard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Leaderboard.hasMany(models.UserLeadeboard);
    }
  }
  Leaderboard.init(
    {
      score: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Score is required",
          },
          notEmpty: {
            msg: "Score is required",
          },
        },
      },
      gameMode: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Game Mode is required",
          },
          notNull: {
            msg: "Game Mode is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Leaderboard",
    }
  );
  return Leaderboard;
};

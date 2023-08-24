"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserLeaderboard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserLeaderboard.belongsTo(models.User);
      UserLeaderboard.belongsTo(models.Leaderboard);
    }
  }
  UserLeaderboard.init(
    {
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "User Id is required",
          },
          notNull: {
            msg: "User Id is required",
          },
        },
      },
      LeaderboardId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Leaderboard Id is required",
          },
          notNull: {
            msg: "Leaderboard Id is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "UserLeaderboard",
    }
  );
  return UserLeaderboard;
};

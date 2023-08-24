"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HighScore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HighScore.belongsTo(models.User);
    }
  }
  HighScore.init(
    {
      easy: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      normal: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      hard: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      impossible: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            msg: "User Id is required",
          },
          notEmpty: {
            msg: "User Id is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "HighScore",
    }
  );
  return HighScore;
};

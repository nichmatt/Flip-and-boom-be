"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TransactionHistory.hasMany(models.User);
    }
  }
  TransactionHistory.init(
    {
      UserId: DataTypes.INTEGER,
      OrderId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      status: DataTypes.ENUM,
    },
    {
      sequelize,
      modelName: "TransactionHistory",
    }
  );
  return TransactionHistory;
};

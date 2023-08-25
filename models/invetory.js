"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invetory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invetory.hasMany("models.Item");
    }
  }
  Invetory.init(
    {
      UserId: DataTypes.INTEGER,
      ItemId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Invetory",
    }
  );
  return Invetory;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.Inventory);
    }
  }
  Item.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Item is required",
          },
          notNull: {
            msg: "Item is required",
          },
        },
      },
      imageUrl: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Image Url is required",
          },
          notNull: {
            msg: "Image Url is required",
          },
        },
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Price is required",
          },
          notNull: {
            msg: "Price is required",
          },
        },
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM,
      },
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};

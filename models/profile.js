"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User);
    }
  }
  Profile.init(
    {
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Username is required",
          },
          notNull: {
            msg: "Username is required",
          },
        },
      },
      exprience: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      balance: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      selectedSkin: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "skin",
      },
      selectedChar: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "char",
      },
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
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};

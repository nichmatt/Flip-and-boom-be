"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Profiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      exprience: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      balance: {
        allowNull: false,
        defaultValue: 10,
        type: Sequelize.INTEGER,
      },
      selectedSkin: {
        allowNull: false,
        defaultValue: "basic",
        type: Sequelize.STRING,
      },
      selectedChar: {
        allowNull: false,
        defaultValue: "basic",
        type: Sequelize.STRING,
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Profiles");
  },
};

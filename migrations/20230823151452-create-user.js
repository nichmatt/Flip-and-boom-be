"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      exprience: {
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      balance: {
        defaultValue: 10,
        type: Sequelize.INTEGER,
      },
      selectedSkin: {
        defaultValue: "basic",
        type: Sequelize.STRING,
      },
      selectedChar: {
        defaultValue: "basic",
        type: Sequelize.STRING,
      },
      easyScore: {
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      mediumScore: {
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      hardScore: {
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      impossibleScore: {
        defaultValue: 0,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Users");
  },
};

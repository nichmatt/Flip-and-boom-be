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
      easyScore: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      mediumScore: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      hardScore: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      impossibleScore: {
        allowNull: false,
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

"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("HighScores", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      easy: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      normal: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      hard: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      impossible: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("HighScores");
  },
};

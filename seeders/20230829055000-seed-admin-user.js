"use strict";

const { hashPassword } = require("../helpers");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userAdmin = [
      {
        username: "admin",
        password: hashPassword("12345"),
        email: "admin@mail.com",
        easyScore: 5000,
        hardScore: 1000,
        mediumScore: 1000,
        impossibleScore: 100,
        balance: 99999,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const inventoryAdmin = [
      {
        UserId: 10,
        ItemId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 10,
        ItemId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 10,
        ItemId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 10,
        ItemId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 10,
        ItemId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 10,
        ItemId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 10,
        ItemId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 10,
        ItemId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 10,
        ItemId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 10,
        ItemId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 10,
        ItemId: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 10,
        ItemId: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 10,
        ItemId: 13,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        UserId: 10,
        ItemId: 14,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Users", userAdmin);
    await queryInterface.bulkInsert("Inventories", inventoryAdmin);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Inventories", null);
  },
};

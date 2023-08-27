'use strict';
let user = require('../db/user.json')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    user = user.map(el => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el
    })
    await queryInterface.bulkInsert('Users', user)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

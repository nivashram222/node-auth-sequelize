'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      { name: 'manager', createdAt: new Date(), updatedAt: new Date() },
      { name: 'team-lead', createdAt: new Date(), updatedAt: new Date() },
      { name: 'developer', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', {
      name: ['manager', 'team-lead', 'developer']
    });
  }
};

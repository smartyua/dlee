'use strict';

const { Profile } = require('../models');

const TABLE_NAME = Profile.getTableName();

module.exports = {
  up: (queryInterface, { DataTypes }) => queryInterface
    .createTable(TABLE_NAME, {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      profession: {
        type: DataTypes.STRING,
        allowNull: false
      },
      balance: {
        type: DataTypes.DECIMAL(12, 2)
      },
      type: {
        type: DataTypes.ENUM('client', 'contractor')
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    })
    .then(() => Promise.all([
      queryInterface.addIndex(TABLE_NAME, ['id'], {
        indicesType: 'UNIQUE'
      })
    ])),

  down: queryInterface => queryInterface
    .dropTable(TABLE_NAME)
};

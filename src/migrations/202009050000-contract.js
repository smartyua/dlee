'use strict';

const { Contract } = require('../models');

const TABLE_NAME = Contract.getTableName();

module.exports = {
  up: (queryInterface, { DataTypes }) => queryInterface
    .createTable(TABLE_NAME, {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
      },
      ClientId: DataTypes.INTEGER,
      ContractorId: DataTypes.INTEGER,
      terms: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('new', 'in_progress', 'terminated')
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

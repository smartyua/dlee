'use strict';

module.exports = (sequelize, DataTypes) => {
  const schema = {
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
    }
  };

  const options = {
    tablename: 'contracts',
    indexes: [
      { fields: ['id'], unique: true },
      { fields: ['status'] },
      { fields: ['ContractorId'] },
      { fields: ['ClientId'] }
    ],
    timestamps: true
  };

  const Contract = sequelize.define('Contract', schema, options);

  Contract.prototype.findContractor = async function () {
    const { ContractorId } = this.get();
    const { models: { Profile } } = sequelize;
    const profile = await Profile.findOne({ where: { id: ContractorId } });

    if (profile) {
      return profile.get();
    }

    return null;
  };

  Contract.associate = models => {
    Contract.belongsTo(models.Profile, {
      as: 'Contractor'
    });

    Contract.belongsTo(models.Profile, {
      as: 'Client'
    });
  };

  return Contract;
};

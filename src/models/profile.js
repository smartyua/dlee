'use strict';

module.exports = (sequelize, DataTypes) => {
  const schema = {
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
    }
  };

  const options = {
    tablename: 'profiles',
    indexes: [
      { fields: ['id'], unique: true },
      { fields: ['firstName', 'lastName'] },
      { fields: ['type'] }
    ],
    timestamps: true
  };

  const Profile = sequelize.define('Profile', schema, options);

  Profile.associate = models => {
    Profile.hasMany(models.Contract, {
      as: 'Contractor',
      foreignKey: 'ContractorId'
    });
  };

  return Profile;
};

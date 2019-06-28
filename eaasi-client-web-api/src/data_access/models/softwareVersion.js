module.exports = function(sequelize, DataTypes) {
  return sequelize.define('softwareVersion', {
    softwareVersionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    softwareVersionQID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    softwareVersionName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    softwareVersionDescription: {
      type: DataTypes.STRING,
      allowNull: false
    },
    softwareVersionNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    softwareVersionPublicationDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    softwareVersionSystemRequirements: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'softwareProduct',
        key: 'softwareProductID'
      }
    },
    isVersionOf_softwareProduct: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'softwareVersion'
  });
};

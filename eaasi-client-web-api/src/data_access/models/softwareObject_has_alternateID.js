module.exports = function(sequelize, DataTypes) {
  return sequelize.define('softwareObject_has_alternateID', {
    softwareObject_softwareObjectID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'softwareObject',
        key: 'softwareObjectID'
      }
    },
    softwareObject_alternateID: {
      type: DataTypes.STRING,
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
    tableName: 'softwareObject_has_alternateID'
  });
};

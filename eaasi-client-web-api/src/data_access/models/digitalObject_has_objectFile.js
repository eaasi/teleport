module.exports = function(sequelize, DataTypes) {
  return sequelize.define('digitalObject_has_objectFile', {
    digitalObject_digitalObjectID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'digitalObject',
        key: 'digitalObjectID'
      }
    },
    digitalObjectFileID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'file',
        key: 'fileID'
      }
    },
    digitalObjectFileLabel: {
      type: DataTypes.STRING,
      allowNull: true
    },
    digitalObjectFile_usesMountFormat: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'mountFormat',
        key: 'mountFormatQID'
      }
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
    tableName: 'digitalObject_has_objectFile'
  });
};

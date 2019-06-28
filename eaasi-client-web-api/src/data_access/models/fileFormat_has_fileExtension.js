module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fileFormat_has_fileExtension', {
    fileFormat_fileFormatQID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'fileFormat',
        key: 'fileFormatQID'
      }
    },
    fileExtension_fileExtensionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'fileExtension',
        key: 'fileExtensionID'
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
    tableName: 'fileFormat_has_fileExtension'
  });
};

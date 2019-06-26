/* jshint indent: 2 */

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
    }
  }, {
    tableName: 'fileFormat_has_fileExtension'
  });
};

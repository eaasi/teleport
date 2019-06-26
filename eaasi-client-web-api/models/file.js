/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('file', {
    fileID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fileLocation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fileChecksum: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fileFormat: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'fileFormat',
        key: 'fileFormatQID'
      }
    },
    fileSize: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'file'
  });
};

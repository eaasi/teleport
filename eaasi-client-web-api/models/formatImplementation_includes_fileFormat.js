/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('formatImplementation_includes_fileFormat', {
    formatImplementation_formatImplementationID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'formatImplementation',
        key: 'formatImplementationID'
      }
    },
    fileFormat_fileFormatQID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'fileFormat',
        key: 'fileFormatQID'
      }
    }
  }, {
    tableName: 'formatImplementation_includes_fileFormat'
  });
};

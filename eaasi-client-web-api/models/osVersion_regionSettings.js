/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('osVersion_regionSettings', {
    osVersion_osVersionID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'osVersion',
        key: 'osVersionID'
      }
    },
    osVersion_regionQID: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'region',
        key: 'regionQID'
      }
    },
    osVersion_defaultRegion: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'osVersion_regionSettings'
  });
};

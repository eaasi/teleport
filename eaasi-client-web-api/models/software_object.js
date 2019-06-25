/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('software_object', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    alternate_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    source_org: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    in_network: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'software_object'
  });
};

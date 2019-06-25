/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('software_object_related_software_environment', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    software_object_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'software_object',
        key: 'id'
      }
    },
    software_environment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'software_environment',
        key: 'id'
      }
    }
  }, {
    tableName: 'software_object_related_software_environment'
  });
};

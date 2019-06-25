/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('object_environment', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    concurrent_instances: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    help_text: {
      type: DataTypes.STRING,
      allowNull: true
    },
    computing_environment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'computing_environment',
        key: 'id'
      }
    },
    digital_object_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'digital_object',
        key: 'id'
      }
    }
  }, {
    tableName: 'object_environment'
  });
};

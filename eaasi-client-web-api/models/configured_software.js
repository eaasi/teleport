/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('configured_software', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    executable_location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    executable_syntax: {
      type: DataTypes.STRING,
      allowNull: true
    },
    save_location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    configured_language: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    software_version_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    source_software_object_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    source_digital_object_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'configured_software'
  });
};

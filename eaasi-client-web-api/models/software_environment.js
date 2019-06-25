/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('software_environment', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
      type: DataTypes.TEXT,
      allowNull: true
    },
    disk_image: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    source_environment: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'software_environment'
  });
};

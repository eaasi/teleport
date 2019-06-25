/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('file', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    file_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    checksum: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    file_format_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    size_bytes: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'file'
  });
};

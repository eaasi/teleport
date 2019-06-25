/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('file_format', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    qid: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pronom_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mime_type: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'file_format'
  });
};

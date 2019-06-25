/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('os_version', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    qid: {
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
    version_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date_published: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    software_product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'os_version'
  });
};

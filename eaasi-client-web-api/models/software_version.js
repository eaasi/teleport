/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('software_version', {
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
    is_version_of_software_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'software_product',
        key: 'id'
      }
    }
  }, {
    tableName: 'software_version'
  });
};

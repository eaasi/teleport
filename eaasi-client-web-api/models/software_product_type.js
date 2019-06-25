/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('software_product_type', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    software_product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'software_product',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'software_product_type'
  });
};

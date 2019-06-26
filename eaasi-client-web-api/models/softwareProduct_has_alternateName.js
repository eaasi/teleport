/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('softwareProduct_has_alternateName', {
    softwareProduct_softwareProductID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'softwareProduct',
        key: 'softwareProductID'
      }
    },
    softwareProduct_alternateNameID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'alternateName',
        key: 'alternateNameID'
      }
    }
  }, {
    tableName: 'softwareProduct_has_alternateName'
  });
};

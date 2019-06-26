/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('alternateName', {
    alternateNameID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    alternateName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'alternateName'
  });
};

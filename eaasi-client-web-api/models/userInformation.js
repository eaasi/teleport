/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userInformation', {
    userInformationID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    organization: {
      type: DataTypes.STRING,
      allowNull: true
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'userInformation'
  });
};

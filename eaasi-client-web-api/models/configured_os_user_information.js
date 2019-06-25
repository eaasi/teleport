/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('configured_os_user_information', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    configured_os_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configured_os',
        key: 'id'
      }
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    organization: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'configured_os_user_information'
  });
};

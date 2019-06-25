/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('configured_network_emulated_network_service', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    emulated_service_port: {
      type: DataTypes.STRING,
      allowNull: true
    },
    configured_network_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configured_network',
        key: 'id'
      }
    },
    network_service_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'network_service',
        key: 'id'
      }
    }
  }, {
    tableName: 'configured_network_emulated_network_service'
  });
};

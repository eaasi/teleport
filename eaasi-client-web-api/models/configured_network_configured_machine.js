/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('configured_network_configured_machine', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    configured_network_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configured_network',
        key: 'id'
      }
    },
    configured_machine_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configured_machine',
        key: 'id'
      }
    },
    boot_order: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    static_ip_address: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'configured_network_configured_machine'
  });
};

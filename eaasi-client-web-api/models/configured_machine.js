/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('configured_machine', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ram: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    architecture: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cpu_cores: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    machine_interface: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    audio_device: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    gpu_device: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    storage_device: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pointer_device: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    network_device: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    keyboard_device: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    emulator: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'configured_machine'
  });
};

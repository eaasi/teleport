/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('device', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    qid: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    machine_interface: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    driver_software: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'device'
  });
};

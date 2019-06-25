/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('computing_environment', {
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
    source_org: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    in_network: {
      type: DataTypes.BOOLEAN,
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
    software_environment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'software_environment',
        key: 'id'
      }
    }
  }, {
    tableName: 'computing_environment'
  });
};

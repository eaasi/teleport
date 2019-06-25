/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('event', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    agent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'agent',
        key: 'id'
      }
    },
    has_event: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'event'
  });
};

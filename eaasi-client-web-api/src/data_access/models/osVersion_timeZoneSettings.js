module.exports = function(sequelize, DataTypes) {
  return sequelize.define('osVersion_timeZoneSettings', {
    osVersion_osVersionID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'osVersion',
        key: 'osVersionID'
      }
    },
    osVersion_timezoneQID: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'timezone',
        key: 'timezoneQID'
      }
    },
    osVersion_timezoneName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'osVersion_timeZoneSettings'
  });
};

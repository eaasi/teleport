module.exports = function(sequelize, DataTypes) {
  return sequelize.define('timezone_has_timezoneName', {
    timezone_timezoneQID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'timezone',
        key: 'timezoneQID'
      }
    },
    timezoneName_timezoneNameID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'timezoneName',
        key: 'timezoneNameID'
      }
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
    tableName: 'timezone_has_timezoneName'
  });
};

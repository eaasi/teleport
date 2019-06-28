module.exports = function(sequelize, DataTypes) {
  return sequelize.define('timezoneName', {
    timezoneNameID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    timeZoneName: {
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
    tableName: 'timezoneName'
  });
};

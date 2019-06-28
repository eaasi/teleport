module.exports = function(sequelize, DataTypes) {
  return sequelize.define('timezone', {
    timezoneQID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    utcOffset: {
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
    tableName: 'timezone'
  });
};

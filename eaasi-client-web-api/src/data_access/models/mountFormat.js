module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mountFormat', {
    mountFormatQID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    mountFormatName: {
      type: DataTypes.STRING,
      allowNull: false
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
    tableName: 'mountFormat'
  });
};

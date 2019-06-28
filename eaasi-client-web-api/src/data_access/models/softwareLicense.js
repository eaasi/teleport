module.exports = function(sequelize, DataTypes) {
  return sequelize.define('softwareLicense', {
    softwareLicenseQID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    softwareLicenseName: {
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
    tableName: 'softwareLicense'
  });
};

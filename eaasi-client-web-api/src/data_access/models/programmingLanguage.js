module.exports = function(sequelize, DataTypes) {
  return sequelize.define('programmingLanguage', {
    programmingLanguageQID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    programmingLanguageName: {
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
    tableName: 'programmingLanguage'
  });
};

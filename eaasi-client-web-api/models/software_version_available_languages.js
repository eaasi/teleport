/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('software_version_available_languages', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    software_version_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'software_version',
        key: 'id'
      }
    },
    language_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'language',
        key: 'id'
      }
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'software_version_available_languages'
  });
};

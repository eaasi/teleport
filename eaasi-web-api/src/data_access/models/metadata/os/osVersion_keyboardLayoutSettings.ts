const Sequelize = require('sequelize');

class OsVersionKeyboardLayoutSettings extends Sequelize.Model {}
module.exports = (sequelize) => {
	OsVersionKeyboardLayoutSettings.init({
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		osVersion_osVersionID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'osVersion',
				key: 'osVersionID'
			}
		},
		osVersion_keyboardLayoutQID: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'keyboardLayout',
				key: 'keyboardLayoutID'
			}
		},
		osVersion_keyboardLayoutName: {
			type: Sequelize.STRING,
			allowNull: true
		}
	}, { sequelize, tableName: 'osVersion_keyboardLayoutSettings' });
	OsVersionKeyboardLayoutSettings.associate = models => {
		models.OsVersionKeyboardLayoutSettings.hasOne(models.OsVersion, {foreignKey: 'osVersionID'});
		models.OsVersionKeyboardLayoutSettings.hasOne(models.KeyboardLayout, {foreignKey: 'keyboardLayoutQID'});
	};

	return OsVersionKeyboardLayoutSettings;
};

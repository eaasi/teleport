const Sequelize = require('sequelize');

class OsVersionHasSoftwareLicense extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
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
			osVersion_softwareLicenseQID: {
				type: Sequelize.STRING,
				allowNull: false,
				references: {
					model: 'softwareLicense',
					key: 'softwareLicenseQID'
				}
			}
		}, { sequelize, tableName: 'osVersion_has_softwareLicense' });
	};

	static associate(models) {
	}
};

module.exports = {
	OsVersionHasSoftwareLicense: OsVersionHasSoftwareLicense
};

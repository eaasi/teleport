import {Timezone} from './timezone';
import {TimezoneName} from './timezoneName';

const Sequelize = require('sequelize');

class TimezoneHasTimezoneName extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
			timezone_timezoneQID: {
				type: Sequelize.STRING,
				allowNull: false,
				references: {
					model: 'timezone',
					key: 'timezoneQID'
				}
			},
			timezoneName_timezoneNameID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'timezoneName',
					key: 'timezoneNameID'
				}
			}
		}, { sequelize, tableName: 'timezone_has_timezoneName' });
	};

	static associate(models) {
		TimezoneHasTimezoneName.hasOne(
			Timezone, {foreignKey: 'timezoneQID'});
		TimezoneHasTimezoneName.hasOne(
			TimezoneName, {foreignKey: 'timezoneNameID'});
	}
}

module.exports = {
	TimezoneHasTimezoneName: TimezoneHasTimezoneName
};

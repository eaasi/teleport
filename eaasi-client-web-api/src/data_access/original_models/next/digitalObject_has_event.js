/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('digitalObject_has_event', {
		digitalObject_digialObjectID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'digitalObject',
				key: 'digitalObjectID'
			}
		},
		event_eventID: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, {
		tableName: 'digitalObject_has_event'
	});
};

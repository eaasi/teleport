module.exports = function(sequelize, DataTypes) {
	return sequelize.define('networkService', {
		networkServiceID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		networkServiceName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		networkServiceQID: {
			type: DataTypes.STRING,
			allowNull: true
		},
		defaultPort: {
			type: DataTypes.STRING,
			allowNull: true
		},
		defaultPortRange: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'networkService'
	});
};

'use strict';

const Sequelize = require('sequelize');

class NetworkDevice extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			networkDeviceID: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			networkDeviceQID: {
				type: Sequelize.STRING,
				allowNull: true
			},
			networkDeviceName: {
				type: Sequelize.STRING,
				allowNull: false
			}
		}, { sequelize, tableName: 'networkDevice' });
	};

	static associate(models) {
	}
};

module.exports = {
	NetworkDevice: NetworkDevice
};

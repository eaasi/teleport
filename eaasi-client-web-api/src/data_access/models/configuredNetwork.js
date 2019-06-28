export default (sequelize, DataTypes) => {
    return sequelize.define('configuredNetwork', {
        configuredNetworkID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        configuredNetworkName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        configuredNetworkDescription: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'configuredNetwork'
    });
}

export default (sequelize, DataTypes) => {
    return sequelize.define('softwareType', {
        softwareTypeQID: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        softwaretypename: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'softwareType'
    });
}

export default (sequelize, DataTypes) => {
    return sequelize.define('mountFormat', {
        mountFormatQID: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        mountFormatName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'mountFormat'
    });
}

export default (sequelize, DataTypes) => {
    return sequelize.define('softwareLicense', {
        softwareLicenseQID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        softwareLicenseName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'softwareLicense'
    });
}

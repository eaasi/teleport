/* jshint indent: 2 */

export default (sequelize, DataTypes) => {
    return sequelize.define('developer', {
        developerQID: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        developerName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'developer'
    });
}

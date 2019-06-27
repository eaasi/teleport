/* jshint indent: 2 */

export default (sequelize, DataTypes) => {
    return sequelize.define('readWriteStatus', {
        readWriteStatusID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        readWriteStatusName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'readWriteStatus'
    });
}

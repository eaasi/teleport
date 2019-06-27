/* jshint indent: 2 */

export default (sequelize, DataTypes) => {
    return sequelize.define('fileExtension', {
        fileExtensionID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        extension: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'fileExtension'
    });
}

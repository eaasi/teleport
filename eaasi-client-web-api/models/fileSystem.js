export default (sequelize, DataTypes) => {
    return sequelize.define('fileSystem', {
        fileSystemQID: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        fileSystemName: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'fileSystem'
    });
}

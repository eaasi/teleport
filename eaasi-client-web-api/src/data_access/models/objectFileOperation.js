export default (sequelize, DataTypes) => {
    return sequelize.define('objectFileOperation', {
        operationID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        operationName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'objectFileOperation'
    });
}

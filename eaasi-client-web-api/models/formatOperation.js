export default (sequelize, DataTypes) => {
    return sequelize.define('formatOperation', {
        operationID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        operationName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'formatOperation'
    });
}

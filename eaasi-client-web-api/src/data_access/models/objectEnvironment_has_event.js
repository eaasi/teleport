export default (sequelize, DataTypes) => {
    return sequelize.define('objectEnvironment_has_event', {
        objectEnvironment_objectEnvironment_computingEnvironmentID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'objectEnvironment',
                key: 'objectEnvironment_objectEnvironment_computingEnvironmentID'
            }
        },
        objectEnvironment_objectEnvironment_digitalObjectID: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        event_eventID: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'objectEnvironment_has_event'
    });
}

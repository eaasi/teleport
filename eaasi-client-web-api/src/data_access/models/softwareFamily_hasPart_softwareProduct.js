export default (sequelize, DataTypes) => {
    return sequelize.define('softwareFamily_hasPart_softwareProduct', {
        softwareFamilyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'softwareProduct',
                key: 'softwareProductID'
            }
        },
        hasPart_softwareProduct: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'softwareProduct',
                key: 'softwareProductID'
            }
        }
    }, {
        tableName: 'softwareFamily_hasPart_softwareProduct'
    });
}

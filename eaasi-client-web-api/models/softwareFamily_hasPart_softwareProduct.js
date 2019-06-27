/* jshint indent: 2 */

export default (sequelize, DataTypes) => {
    return sequelize.define('softwareFamily_hasPart_softwareProduct', {
        softwarefamilyid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'softwareProduct',
                key: 'softwareProductID'
            }
        },
        haspart_softwareproduct: {
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

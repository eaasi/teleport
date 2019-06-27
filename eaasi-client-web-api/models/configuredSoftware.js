/* jshint indent: 2 */

export default (sequelize, DataTypes) => {
    return sequelize.define('configuredSoftware', {
        configuredSoftwareVersionID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 'nextval(configured_software_id_seq::regclass)',
            primaryKey: true,
            references: {
                model: 'softwareVersion',
                key: 'softwareVersionID'
            }
        },
        executableLocation: {
            type: DataTypes.STRING,
            allowNull: true
        },
        executableSyntax: {
            type: DataTypes.STRING,
            allowNull: true
        },
        saveLocation: {
            type: DataTypes.STRING,
            allowNull: true
        },
        configuredLanguage: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        hasSource_softwareObjectID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'softwareObject',
                key: 'softwareObjectID'
            }
        },
        hasSource_digitalObjectID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'digitalObject',
                key: 'digitalObjectID'
            }
        },
        manifestaionOf_softwareVersion: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'configuredSoftware'
    });
}

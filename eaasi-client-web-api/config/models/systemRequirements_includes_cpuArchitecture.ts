/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {systemRequirements_includes_cpuArchitectureInstance, systemRequirements_includes_cpuArchitectureAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<systemRequirements_includes_cpuArchitectureInstance, systemRequirements_includes_cpuArchitectureAttribute>('systemRequirements_includes_cpuArchitecture', {
    systemRequirements_systemRequirementsID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'systemRequirements',
        key: 'systemRequirementsID'
      }
    },
    systemRequirements_cpuArchitecture: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'cpuArchitecture',
        key: 'cpuArchitectureQID'
      }
    }
  }, {
    tableName: 'systemRequirements_includes_cpuArchitecture'
  });
};

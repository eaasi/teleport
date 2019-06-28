
const sequelize = require('../models/index')

const AltName = require('../models/alternateName')(sequelize, Sequelize)

module.exports = {
    getAlternateName: function() {
        return new Promise((resolve, reject) => {
            AltName.findOne().then(altName => {
                console.log('alternateName value is '+JSON.stringify(altName));
                resolve(altName);
            }).catch(err => {
                console.log('error occurred', err);
                reject(err);
            });
        });
    }
}

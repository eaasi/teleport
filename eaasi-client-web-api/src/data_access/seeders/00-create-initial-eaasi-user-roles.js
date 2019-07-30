'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        let now = new Date();
        return queryInterface.bulkInsert('eaasi_role', [
            { roleName: 'admin', createdAt: now, updatedAt: now },
            { roleName: 'contributor', createdAt: now, updatedAt: now },
            { roleName: 'configuration_user', createdAt: now, updatedAt: now },
        ]);
    },

    down: (queryInterface, Sequelize) => {
        queryInterface.sequelize.query("ALTER SEQUENCE \"eaasi_role_id_seq\" RESTART WITH 1;");
        return queryInterface.bulkDelete('eaasi_role', {}, {});
    }
};

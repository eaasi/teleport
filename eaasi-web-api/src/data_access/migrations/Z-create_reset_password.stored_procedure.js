'use strict';

const Sq = require('sequelize');

module.exports = {
	up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`
CREATE OR REPLACE PROCEDURE reset_init_user_password()
LANGUAGE SQL
AS $BODY$
UPDATE public.eaasi_user_hash
SET hash = '$2b$10$e5SsSSnBl2RNSiiQOolAeemdCq.d4TpfaCuvJi.uQ5LbPBgZAvrLy'
WHERE "userId" = 1
$BODY$;
        `);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.query('DROP PROCEDURE IF EXISTS reset_init_user_password');
	}
};

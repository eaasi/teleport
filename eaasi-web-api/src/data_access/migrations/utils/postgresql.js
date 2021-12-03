export async function getColumnNames(table, queryInterface)
{
	// PostgreSQL does not support 'DESCRIBE TABLE' queries!
	const sql = 'SELECT column_name ' +
	            'FROM information_schema.columns ' +
	            'WHERE table_name = \'' + table + '\'';

	const names = new Set();
	const { 0: results } = await queryInterface.sequelize.query(sql);
	results.forEach((entry) => names.add(entry.column_name));
	return names;
}

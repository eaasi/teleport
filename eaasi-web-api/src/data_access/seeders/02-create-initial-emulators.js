module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('emulator', [
			{
				name: 'qemu-system',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'basiliskII',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'beebem',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'hatari',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'kegs-sdl',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'pce',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'sheepshaver',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'vice-sdl',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'fs-uae',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'contralto',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'visualboyadvance',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'linapple',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'vmacmini',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'previous',
				createdAt: new Date(),
				updatedAt: new Date()
			 }
		]);
	},

	down: (queryInterface) => {
		queryInterface.sequelize.query('ALTER SEQUENCE "emulator_id_seq" RESTART WITH 1;');
		return queryInterface.bulkDelete('emulator', {}, {});
	}
};
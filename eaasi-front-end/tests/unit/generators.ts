import User from '@/models/auth/User';
import faker from 'faker';
import {IEaasiRole} from "eaasi-auth";

export function generateFakeUsers(userCount: number) : User[] {
	let users = [];
	for (let i = 1; i <= userCount; i++) {
		users.push({
			id: faker.random.number(),
			firstName: faker.name.firstName(),
			username: faker.hacker.adjective() + '_' + faker.hacker.noun(),
			createdAt: faker.date.past(),
			updatedAt: faker.date.recent(),
			lastLogin: faker.date.recent()
		});
	}
	return users;
}

export function generateFakeRoles(roleCount: number) : IEaasiRole[] {
	let roles = [];
	for (let i = 1; i <= roleCount; i++) {
		roles.push({
			id: faker.random.number(),
			roleName: faker.hacker.noun(),
			roleDescription: faker.random.words(),
			createdAt: faker.date.past(),
			updatedAt: faker.date.recent()
		});
	}
	return roles;
}

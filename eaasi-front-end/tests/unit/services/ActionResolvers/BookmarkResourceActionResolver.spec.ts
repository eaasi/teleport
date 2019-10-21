import BookmarkResourceActionResolver from '@/services/ActionResolvers/BookmarkResourceActionResolver';
import { generateFakeEnvironments } from '../../generators';

describe('BookmarkResourceActionResolver', () => {
	it('should have action name Bookmark This Resource', () => {
		let sut = new BookmarkResourceActionResolver([], 1);
		expect(sut.action.label).toBe('Bookmark This Resource');
	});

	it('should be enabled if a single resource is selected', () => {
		let fakeEnvs = generateFakeEnvironments(1);
		let sut = new BookmarkResourceActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be enabled if more than one resource is selected', () => {
		let fakeEnvs = generateFakeEnvironments(8);
		let sut = new BookmarkResourceActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be enabled for admin user role', () => {
		let fakeEnvs = generateFakeEnvironments(1);
		let sut = new BookmarkResourceActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be enabled for manager user role', () => {
		let fakeEnvs = generateFakeEnvironments(1);
		let sut = new BookmarkResourceActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be enabled for contributor user role', () => {
		let fakeEnvs = generateFakeEnvironments(1);
		let sut = new BookmarkResourceActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});
});
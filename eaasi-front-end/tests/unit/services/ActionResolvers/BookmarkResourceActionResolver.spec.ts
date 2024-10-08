/*import BookmarkResourceActionResolver from '@/services/ActionResolvers/BookmarkResourceActionResolver';
import { generateFakeEnvironments } from '../../generators';


describe('BookmarkResourceActionResolver', () => {
	it('should have action name Bookmark This Resource', () => {
		const sut = new BookmarkResourceActionResolver([], 1);
		expect(sut.action.label).toBe('Bookmark This Resource');
	});

	it('should be enabled if a single resource is selected', () => {
		const fakeEnvs = generateFakeEnvironments(1);
		const sut = new BookmarkResourceActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be enabled if more than one resource is selected', () => {
		const fakeEnvs = generateFakeEnvironments(8);
		const sut = new BookmarkResourceActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be enabled for admin user role', () => {
		const fakeEnvs = generateFakeEnvironments(1);
		const sut = new BookmarkResourceActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be enabled for manager user role', () => {
		const fakeEnvs = generateFakeEnvironments(1);
		const sut = new BookmarkResourceActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be enabled for contributor user role', () => {
		const fakeEnvs = generateFakeEnvironments(1);
		const sut = new BookmarkResourceActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});
});*/

import DeleteResourceActionResolver from '@/services/ActionResolvers/DeleteResourceActionResolver';
import { generateFakeEnvironments } from '../../generators';

describe('DeleteResourceActionResolver', () => {
	it('should have action name Delete', () => {
		const sut = new DeleteResourceActionResolver([], 1);
		expect(sut.action.label).toBe('Delete');
	});

	it('should be enabled if a single resource is selected and userRole is Admin', () => {
		const fakeEnvs = generateFakeEnvironments(1);
		const sut = new DeleteResourceActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be disabled if a single resource is selected and userRole is Admin, and resource has remote archive', () => {
		const fakeEnvs = generateFakeEnvironments(1);
		fakeEnvs[0].archiveId = 'Remote Objects';
		const sut = new DeleteResourceActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(false);
	});

	it('should be enabled if more than one resource is selected and userRole is Admin', () => {
		const fakeEnvs = generateFakeEnvironments(2);
		const sut = new DeleteResourceActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be disabled if one of resources is in remote archive regardless of userRole', () => {
		const fakeEnvs = generateFakeEnvironments(2);
		fakeEnvs[1].archiveId = 'Remote Objects';
		const sut = new DeleteResourceActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(false);
	});

	it('should be disabled if one resource is selected and userRole is not Admin', () => {
		const fakeEnvs = generateFakeEnvironments(2);
		const sut = new DeleteResourceActionResolver(fakeEnvs, 23);
		expect(sut.action.isEnabled).toBe(false);
	});

	it('should be disabled if more than one resource is selected and userRole is not Admin', () => {
		const fakeEnvs = generateFakeEnvironments(2);
		const sut = new DeleteResourceActionResolver(fakeEnvs, -39);
		expect(sut.action.isEnabled).toBe(false);
	});

	it('should be disabled if more than one resource is selected and userRole is not Admin, and archive is remote', () => {
		const fakeEnvs = generateFakeEnvironments(2);
		fakeEnvs[1].archiveId = 'Remote Objects';
		const sut = new DeleteResourceActionResolver(fakeEnvs, -39);
		expect(sut.action.isEnabled).toBe(false);
	});

	it('should be enabled for manager user role', () => {
		const fakeEnvs = generateFakeEnvironments(1);
		const sut = new DeleteResourceActionResolver(fakeEnvs, 2);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be disabled for contributor user role', () => {
		const fakeEnvs = generateFakeEnvironments(1);
		const sut = new DeleteResourceActionResolver(fakeEnvs, 3);
		expect(sut.action.isEnabled).toBe(false);
	});
});
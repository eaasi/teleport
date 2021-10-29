import SaveToMyNodeActionResolver from '@/services/ActionResolvers/SaveToMyNodeActionResolver';
import { generateFakeEnvironments } from '../../generators';

describe('SaveToMyNodeActionResolver', () => {
	it('should have action name View Details', () => {
		const sut = new SaveToMyNodeActionResolver([], 1);
		expect(sut.action.label).toBe('Save to My Node');
	});

	it('should be enabled if a single remote resource is selected', () => {
		const fakeEnvs = generateFakeEnvironments(1);
		fakeEnvs[0].archive = 'remote';
		const sut = new SaveToMyNodeActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be disabled if a single public resource is selected', () => {
		const fakeEnvs = generateFakeEnvironments(1);
		fakeEnvs[0].archive = 'public';
		const sut = new SaveToMyNodeActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(false);
	});

	it('should be disabled if more than one resource is selected', () => {
		const fakeEnvs = generateFakeEnvironments(2);
		const sut = new SaveToMyNodeActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(false);
	});

	it('should be enabled for admin user role', () => {
		const fakeEnvs = generateFakeEnvironments(1);
		fakeEnvs[0].archive = 'remote';
		const sut = new SaveToMyNodeActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be enabled for manager user role', () => {
		const fakeEnvs = generateFakeEnvironments(1);
		fakeEnvs[0].archive = 'remote';
		const sut = new SaveToMyNodeActionResolver(fakeEnvs, 2);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be enabled for contributor user role', () => {
		const fakeEnvs = generateFakeEnvironments(1);
		fakeEnvs[0].archive = 'remote';
		const sut = new SaveToMyNodeActionResolver(fakeEnvs, 3);
		expect(sut.action.isEnabled).toBe(true);
	});
});
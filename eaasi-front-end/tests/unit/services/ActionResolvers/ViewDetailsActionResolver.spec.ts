import ViewDetailsActionResolver from '@/services/ActionResolvers/ViewDetailsActionResolver';
import { generateFakeEnvironments } from '../../generators';

describe('ViewDetailsActionResolver', () => {
	it('should have action name View Details', () => {
		const sut = new ViewDetailsActionResolver([], 1);
		expect(sut.action.label).toBe('View Details');
	});

	it('should be enabled if a single resource is selected', () => {
		const fakeEnvs = generateFakeEnvironments(1);
		const sut = new ViewDetailsActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be disabled if more than one resource is selected', () => {
		const fakeEnvs = generateFakeEnvironments(2);
		const sut = new ViewDetailsActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(false);
	});

	it('should be enabled for admin user role', () => {
		const fakeEnvs = generateFakeEnvironments(1);
		const sut = new ViewDetailsActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be enabled for manager user role', () => {
		const fakeEnvs = generateFakeEnvironments(1);
		const sut = new ViewDetailsActionResolver(fakeEnvs, 2);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be enabled for contributor user role', () => {
		const fakeEnvs = generateFakeEnvironments(1);
		const sut = new ViewDetailsActionResolver(fakeEnvs, 3);
		expect(sut.action.isEnabled).toBe(true);
	});
});
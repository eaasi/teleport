import ViewDetailsActionResolver from '@/services/ActionResolvers/ViewDetailsActionResolver';
import { generateFakeEnvironments } from '../../generators';

describe('ViewDetailsActionResolver', () => {
	it('should have action name View Details', () => {
		let sut = new ViewDetailsActionResolver([], 1);
		expect(sut.action.label).toBe('View Details');
	});

	it('should be enabled if a single resource is selected', () => {
		let fakeEnvs = generateFakeEnvironments(1);
		let sut = new ViewDetailsActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be disabled if more than one resource is selected', () => {
		let fakeEnvs = generateFakeEnvironments(2);
		let sut = new ViewDetailsActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(false);
	});

	it('should be enabled for admin user role', () => {
		let fakeEnvs = generateFakeEnvironments(1);
		let sut = new ViewDetailsActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be enabled for manager user role', () => {
		let fakeEnvs = generateFakeEnvironments(1);
		let sut = new ViewDetailsActionResolver(fakeEnvs, 2);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be enabled for contributor user role', () => {
		let fakeEnvs = generateFakeEnvironments(1);
		let sut = new ViewDetailsActionResolver(fakeEnvs, 3);
		expect(sut.action.isEnabled).toBe(true);
	});
});
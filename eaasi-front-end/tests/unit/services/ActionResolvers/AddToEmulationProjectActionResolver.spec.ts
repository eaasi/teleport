import AddToEmulationProjectActionResolver from '@/services/ActionResolvers/AddToEmulationProjectActionResolver';
import { generateFakeEnvironments } from '../../generators';

describe('AddToEmulationResolver', () => {
	it('should have action name Add To Emulation Project', () => {
		let sut = new AddToEmulationProjectActionResolver([], 1);
		expect(sut.action.label).toBe('Add to Emulation Project');
	});

	it('should be enabled if a single resource is selected', () => {
		let fakeEnvs = generateFakeEnvironments(1);
		let sut = new AddToEmulationProjectActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be enabled if more than one resource is selected', () => {
		let fakeEnvs = generateFakeEnvironments(2);
		let sut = new AddToEmulationProjectActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be enabled for admin user role', () => {
		let fakeEnvs = generateFakeEnvironments(1);
		let sut = new AddToEmulationProjectActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be enabled for manager user role', () => {
		let fakeEnvs = generateFakeEnvironments(1);
		let sut = new AddToEmulationProjectActionResolver(fakeEnvs, 2);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be enabled for contributor user role', () => {
		let fakeEnvs = generateFakeEnvironments(1);
		let sut = new AddToEmulationProjectActionResolver(fakeEnvs, 3);
		expect(sut.action.isEnabled).toBe(true);
	});
});
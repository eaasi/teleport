import RunInEmulatorActionResolver from '@/services/ActionResolvers/RunInEmulatorActionResolver';
import { generateFakeEnvironments } from '../../generators';

describe('RunInEmulatorActionResolver', () => {
	it('should have action name Run In Emulator', () => {
		let sut = new RunInEmulatorActionResolver([], 1);
		expect(sut.action.label).toBe('Run in Emulator');
	});

	it('should be enabled if a single public resource is selected', () => {
		let fakeEnvs = generateFakeEnvironments(1);
		fakeEnvs[0].archive = 'public';
		let sut = new RunInEmulatorActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be disabled if more than one resource is selected', () => {
		let fakeEnvs = generateFakeEnvironments(2);
		fakeEnvs[0].archive = 'public';
		fakeEnvs[1].archive = 'public';
		let sut = new RunInEmulatorActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(false);
	});

	it('should be disabled if a single remote resource is selected', () => {
		let fakeEnvs = generateFakeEnvironments(1);
		fakeEnvs[0].archive = 'remote';
		let sut = new RunInEmulatorActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(false);
	});

	it('should be disabled if a single non-public resource is selected', () => {
		let fakeEnvs = generateFakeEnvironments(1);
		fakeEnvs[0].archive = 'foo';
		let sut = new RunInEmulatorActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(false);
	});

	it('should be enabled for admin user role', () => {
		let fakeEnvs = generateFakeEnvironments(1);
		fakeEnvs[0].archive = 'public';
		let sut = new RunInEmulatorActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be enabled for manager user role', () => {
		let fakeEnvs = generateFakeEnvironments(1);
		fakeEnvs[0].archive = 'public';
		let sut = new RunInEmulatorActionResolver(fakeEnvs, 2);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be enabled for contributor user role', () => {
		let fakeEnvs = generateFakeEnvironments(1);
		fakeEnvs[0].archive = 'public';
		let sut = new RunInEmulatorActionResolver(fakeEnvs, 3);
		expect(sut.action.isEnabled).toBe(true);
	});
});
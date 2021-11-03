import RunInEmulatorActionResolver from '@/services/ActionResolvers/RunInEmulatorActionResolver';
import { generateFakeEnvironments } from '../../generators';

describe('RunInEmulatorActionResolver', () => {
	it('should have action name Run In Emulator', () => {
		const sut = new RunInEmulatorActionResolver([], 1);
		expect(sut.action.label).toBe('Run in Emulator');
	});

	it('should be enabled if a single public resource is selected', () => {
		const fakeEnvs = generateFakeEnvironments(1);
		fakeEnvs[0].archive = 'public';
		const sut = new RunInEmulatorActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be disabled if more than one resource is selected', () => {
		const fakeEnvs = generateFakeEnvironments(2);
		fakeEnvs[0].archive = 'public';
		fakeEnvs[1].archive = 'public';
		const sut = new RunInEmulatorActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(false);
	});

	it('should be disabled if a single remote resource is selected', () => {
		const fakeEnvs = generateFakeEnvironments(1);
		fakeEnvs[0].archive = 'remote';
		const sut = new RunInEmulatorActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(false);
	});

	it('should be disabled if a single non-public resource is selected', () => {
		const fakeEnvs = generateFakeEnvironments(1);
		fakeEnvs[0].archive = 'remote';
		const sut = new RunInEmulatorActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(false);
	});

	it('should be enabled for admin user role', () => {
		const fakeEnvs = generateFakeEnvironments(1);
		fakeEnvs[0].archive = 'public';
		const sut = new RunInEmulatorActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be enabled for manager user role', () => {
		const fakeEnvs = generateFakeEnvironments(1);
		fakeEnvs[0].archive = 'public';
		const sut = new RunInEmulatorActionResolver(fakeEnvs, 2);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be enabled for contributor user role', () => {
		const fakeEnvs = generateFakeEnvironments(1);
		fakeEnvs[0].archive = 'public';
		const sut = new RunInEmulatorActionResolver(fakeEnvs, 3);
		expect(sut.action.isEnabled).toBe(true);
	});
});
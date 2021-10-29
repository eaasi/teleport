import PublishToNetworkActionResolver from '@/services/ActionResolvers/PublishToNetworkActionResolver';
import { generateFakeEnvironments } from '../../generators';
import {archiveTypes, ENVIRONMENT_TYPES} from '@/utils/constants';

describe('PublishToNetworkActionResolver', () => {
	it('should have action name Publish to Network', () => {
		const sut = new PublishToNetworkActionResolver([], 1);
		expect(sut.action.label).toBe('Publish to Network');
	});

	it('should be enabled if a single, unpublished resource is selected', () => {
		const fakeEnvs = generateFakeEnvironments(1, ENVIRONMENT_TYPES.BASE);
		const sut = new PublishToNetworkActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be enabled if multiple unpublished resources are selected', () => {
		const fakeEnvs = generateFakeEnvironments(3, ENVIRONMENT_TYPES.BASE);
		const sut = new PublishToNetworkActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be disabled if a remote resource is selected', () => {
		const fakeEnvs = generateFakeEnvironments(2);
		fakeEnvs[1].archive = archiveTypes.REMOTE;
		const sut = new PublishToNetworkActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(false);
	});

	it('should be enabled for admin user role', () => {
		const fakeEnvs = generateFakeEnvironments(1, ENVIRONMENT_TYPES.BASE);
		const sut = new PublishToNetworkActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be enabled for manager user role', () => {
		const fakeEnvs = generateFakeEnvironments(1, ENVIRONMENT_TYPES.BASE);
		const sut = new PublishToNetworkActionResolver(fakeEnvs, 2);
		expect(sut.action.isEnabled).toBe(true);
	});

	it('should be enabled for contributor user role', () => {
		const fakeEnvs = generateFakeEnvironments(1, ENVIRONMENT_TYPES.BASE);
		const sut = new PublishToNetworkActionResolver(fakeEnvs, 3);
		expect(sut.action.isEnabled).toBe(true);
	});
});
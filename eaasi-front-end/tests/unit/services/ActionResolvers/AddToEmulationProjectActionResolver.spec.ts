import AddToEmulationProjectActionResolver from '@/services/ActionResolvers/AddToEmulationProjectActionResolver';
import { generateFakeEnvironments } from '../../generators';
import { ENVIRONMENT_TYPES } from '@/utils/constants';

describe('AddToEmulationResolver', () => {
	// The feature has not been developed
	it('should be disabled', () => {
		const fakeEnvs = generateFakeEnvironments(1, ENVIRONMENT_TYPES.BASE);
		const sut = new AddToEmulationProjectActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});
});
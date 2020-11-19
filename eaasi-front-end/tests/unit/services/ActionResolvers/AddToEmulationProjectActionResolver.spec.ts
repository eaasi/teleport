import AddToEmulationProjectActionResolver from '@/services/ActionResolvers/AddToEmulationProjectActionResolver';
import { generateFakeEnvironments } from '../../generators';

describe('AddToEmulationResolver', () => {
	// The feature has not been developed
	it('should be disabled', () => {
		let fakeEnvs = generateFakeEnvironments(1);
		let sut = new AddToEmulationProjectActionResolver(fakeEnvs, 1);
		expect(sut.action.isEnabled).toBe(true);
	});
});
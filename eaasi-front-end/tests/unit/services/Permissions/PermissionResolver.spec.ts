import PermissionResolver from '@/services/Permissions/PermissionResolver';
import {userRoles} from '@/utils/constants';

describe('PermissionResolver', () => {

	// Test Manage Node Users permission resolution

	it('returns true when allowsViewManageNodeUsers called and provided user role is Admin', () => {
		const sut = new PermissionResolver(userRoles.ADMIN);
		expect(sut.allowsManageOrganizationUsers()).toBe(true);
	});

	it('returns true when allowsViewManageNodeUsers called and provided user role is Manager', () => {
		const sut = new PermissionResolver(userRoles.MANAGER);
		expect(sut.allowsManageOrganizationUsers()).toBe(true);
	});

	it('returns true when allowsViewManageNodeUsers called and provided user role is Config User', () => {
		const sut = new PermissionResolver(userRoles.CONTRIBUTOR);
		expect(sut.allowsManageOrganizationUsers()).toBe(true);
	});

	// Test Manage Node Page permission resolution

	it('returns true when allowsViewManageOrganizationPage called and provided user role is Admin', () => {
		const sut = new PermissionResolver(userRoles.ADMIN);
		expect(sut.allowsViewManageOrganizationPage()).toBe(true);
	});

	it('returns true when allowsViewManageOrganizationPage called and provided user role is Manager', () => {
		const sut = new PermissionResolver(userRoles.MANAGER);
		expect(sut.allowsViewManageOrganizationPage()).toBe(true);
	});

	it('returns true when allowsViewManageOrganizationPage called and provided user role is Config User', () => {
		const sut = new PermissionResolver(userRoles.CONTRIBUTOR);
		expect(sut.allowsViewManageOrganizationPage()).toBe(true);
	});

	// Test Import Environment Resources permission resolution

	it('returns true when allowsSingleEnvironmentImport called and provided user role is Admin', () => {
		const sut = new PermissionResolver(userRoles.ADMIN);
		expect(sut.allowsSingleEnvironmentImport()).toBe(true);
	});

	it('returns true when allowsSingleEnvironmentImport called and provided user role is Manager', () => {
		const sut = new PermissionResolver(userRoles.MANAGER);
		expect(sut.allowsSingleEnvironmentImport()).toBe(true);
	});

	it('returns true when allowsSingleEnvironmentImport called and provided user role is Config User', () => {
		const sut = new PermissionResolver(userRoles.CONTRIBUTOR);
		expect(sut.allowsSingleEnvironmentImport()).toBe(false);
	});

	// Test Delete Local Resources permission resolution

	it('returns true when allowsDeleteLocalResourcesFromNode called and provided user role is Admin', () => {
		const sut = new PermissionResolver(userRoles.ADMIN);
		expect(sut.allowsSingleEnvironmentImport()).toBe(true);
	});

	it('returns true when allowsDeleteLocalResourcesFromNode called and provided user role is Manager', () => {
		const sut = new PermissionResolver(userRoles.MANAGER);
		expect(sut.allowsSingleEnvironmentImport()).toBe(true);
	});

	it('returns true when allowsDeleteLocalResourcesFromNode called and provided user role is Config User', () => {
		const sut = new PermissionResolver(userRoles.CONTRIBUTOR);
		expect(sut.allowsSingleEnvironmentImport()).toBe(false);
	});
});

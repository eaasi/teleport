import PermissionResolver from '@/services/Permissions/PermissionResolver';
import {userRoles} from '@/utils/constants';

describe('PermissionResolver', () => {

	// Test Manage Node Users permission resolution

	it('returns true when allowsViewManageNodeUsers called and provided user role is Admin', () => {
		let sut = new PermissionResolver(userRoles.ADMIN);
		expect(sut.allowsManageNodeUsers()).toBe(true);
	});

	it('returns false when allowsViewManageNodeUsers called and provided user role is Manager', () => {
		let sut = new PermissionResolver(userRoles.MANAGER);
		expect(sut.allowsManageNodeUsers()).toBe(false);
	});

	it('returns false when allowsViewManageNodeUsers called and provided user role is Config User', () => {
		let sut = new PermissionResolver(userRoles.CONTRIBUTOR);
		expect(sut.allowsManageNodeUsers()).toBe(false);
	});

	// Test Manage Node Page permission resolution

	it('returns true when allowsManageNodePage called and provided user role is Admin', () => {
		let sut = new PermissionResolver(userRoles.ADMIN);
		expect(sut.allowsViewManageNodePage()).toBe(true);
	});

	it('returns false when allowsViewManageNodePage called and provided user role is Manager', () => {
		let sut = new PermissionResolver(userRoles.MANAGER);
		expect(sut.allowsViewManageNodePage()).toBe(false);
	});

	it('returns false when allowsViewManageNodePage called and provided user role is Config User', () => {
		let sut = new PermissionResolver(userRoles.CONTRIBUTOR);
		expect(sut.allowsViewManageNodePage()).toBe(false);
	});

	// Test Import Environment Resources permission resolution

	it('returns true when allowsSingleEnvironmentImport called and provided user role is Admin', () => {
		let sut = new PermissionResolver(userRoles.ADMIN);
		expect(sut.allowsSingleEnvironmentImport()).toBe(true);
	});

	it('returns true when allowsSingleEnvironmentImport called and provided user role is Manager', () => {
		let sut = new PermissionResolver(userRoles.MANAGER);
		expect(sut.allowsSingleEnvironmentImport()).toBe(true);
	});

	it('returns true when allowsSingleEnvironmentImport called and provided user role is Config User', () => {
		let sut = new PermissionResolver(userRoles.CONTRIBUTOR);
		expect(sut.allowsSingleEnvironmentImport()).toBe(false);
	});

	// Test Delete Local Resources permission resolution

	it('returns true when allowsDeleteLocalResourcesFromNode called and provided user role is Admin', () => {
		let sut = new PermissionResolver(userRoles.ADMIN);
		expect(sut.allowsSingleEnvironmentImport()).toBe(true);
	});

	it('returns true when allowsDeleteLocalResourcesFromNode called and provided user role is Manager', () => {
		let sut = new PermissionResolver(userRoles.MANAGER);
		expect(sut.allowsSingleEnvironmentImport()).toBe(true);
	});

	it('returns true when allowsDeleteLocalResourcesFromNode called and provided user role is Config User', () => {
		let sut = new PermissionResolver(userRoles.CONTRIBUTOR);
		expect(sut.allowsSingleEnvironmentImport()).toBe(false);
	});
});

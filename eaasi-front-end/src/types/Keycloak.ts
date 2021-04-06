export interface IKeycloakUser {
	sub: string;
	preferred_username: string;
	email_verified: boolean;
	email?: string;
	family_name?: string;
	given_name?: string;
	name?: string;
	roles: KeycloakRole[]
}

export enum KeycloakRole {
	EaasUser = 'eaas-user',
	EaasAdmin = 'eaas-admin',
	EaasManager = 'eaas-manager'
}
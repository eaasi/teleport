export const ROUTES: IRoutes = {
    INDEX: '/',
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    MANAGE_NODE: '/manage-node',
    MANAGE_NODE_USERS: '/manage-node/users',
    MANAGE_NODE_EMULATORS: '/manage-node/emulators',
    MANAGE_NODE_RUNNING_TASKS: '/manage-node/running-tasks',
    MANAGE_NODE_METADATA_SYNC: '/manage-node/metadata-sync',
    EMULATION_PROJECT: '/emulation-project',
    IMPORT_RESOURCE: '/import-resource',
    RESOURCES_MY_RESOURCES: '/resources/my-resources',
    RESOURCES_EXPLORE: '/resources/explore',
    RESOURCES_SOFTWARE: '/resources/software',
    RESOURCES_ENVIRONMENT: '/resources/environment',
    RESOURCES_CONTENT: '/resources/content',
    ACCESS_INTERFACE: '/access-interface',
    WILD_CARD: '*',
};

export interface IRoutes {
    INDEX: string;
    LOGIN: string;
    DASHBOARD: string;
    MANAGE_NODE: string;
    MANAGE_NODE_USERS: string;
    MANAGE_NODE_EMULATORS: string;
    MANAGE_NODE_RUNNING_TASKS: string;
    MANAGE_NODE_METADATA_SYNC: string;
    EMULATION_PROJECT: string;
    IMPORT_RESOURCE: string;
    RESOURCES_MY_RESOURCES: string;
    RESOURCES_EXPLORE: string;
    RESOURCES_SOFTWARE: string;
    RESOURCES_ENVIRONMENT: string;
    RESOURCES_CONTENT: string;
    ACCESS_INTERFACE: string;
    WILD_CARD: string;
}
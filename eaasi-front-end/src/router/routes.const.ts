export const ROUTES: IRoutes = {
    INDEX: '/',
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    MANAGE_NODE: {
        ROOT: '/manage-node',
        USERS: '/manage-node/users',
        EMULATORS: '/manage-node/emulators',
        RUNNING_TASKS: '/manage-node/running-tasks',
        METADATA_SYNC: '/manage-node/metadata-sync',
        NODE_PREFERENCES: '/manage-node/node-preferences',
        INSTALL_AND_UPDATES: '/manage-node/install-updates',
    },
    EMULATION_PROJECT: {
        ROOT: '/emulation-project',
        DETAILS: '/emulation-project/details',
        OPTIONS: '/emulation-project/options',
        CREATE_BASE_ENVIRONMENT: '/emulation-project/create-base-environment',
    },
    IMPORT_RESOURCE: '/import-resource',
    RESOURCES: {
        MY_RESOURCES: '/resources/my-resources',
        EXPLORE: '/resources/explore',
        SOFTWARE: '/resources/software',
        ENVIRONMENT: '/resources/environment',
        CONTENT: '/resources/content',
    },
    ACCESS_INTERFACE: '/access-interface',
    WILD_CARD: '*',
};

interface IRoutes {
    INDEX: string;
    LOGIN: string;
    DASHBOARD: string;
    MANAGE_NODE: IManageNodeRoutes;
    EMULATION_PROJECT: IEmulationProjectRoutes;
    IMPORT_RESOURCE: string;
    RESOURCES: IResourcesRoutes;
    ACCESS_INTERFACE: string;
    WILD_CARD: string;
}

interface IManageNodeRoutes {
    ROOT: string;
    USERS: string;
    EMULATORS: string;
    RUNNING_TASKS: string;
    METADATA_SYNC: string;
    NODE_PREFERENCES: string;
    INSTALL_AND_UPDATES: string;
}

interface IEmulationProjectRoutes {
    ROOT: string;
    DETAILS: string;
    OPTIONS: string;
    CREATE_BASE_ENVIRONMENT: string;
}

interface IResourcesRoutes {
    MY_RESOURCES: string;
    EXPLORE: string;
    SOFTWARE: string;
    ENVIRONMENT: string;
    CONTENT: string;
}
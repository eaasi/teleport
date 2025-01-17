export const ROUTES: IRoutes = {
    INDEX: '/',
    DASHBOARD: '/dashboard',
    MANAGE_NODE: {
        ROOT: '/manage-node',
        USERS: '/manage-node/users',
        EMULATORS: '/manage-node/emulators',
        /*RUNNING_TASKS: '/manage-node/running-tasks',*/
        NODE_PREFERENCES: '/manage-node/node-preferences',
        TROUBLESHOOTING: '/manage-node/troubleshooting',
    },
    /*EMULATION_PROJECT: {
        ROOT: '/emulation-project',
        DETAILS: '/emulation-project/details',
        OPTIONS: '/emulation-project/options',
        CREATE_BASE_ENVIRONMENT: '/emulation-project/create-base-environment',
    },*/
    IMPORT_RESOURCE: '/import-resource',
    RESOURCES: {
        MY_RESOURCES: '/resources/my-resources',
        EXPLORE: '/resources/explore',
        SOFTWARE: '/resources/software',
        ENVIRONMENT: '/resources/environment',
        CONTENT: '/resources/content',
    },
    ACCESS_INTERFACE: '/access-interface',
    ACCESS_DENIED: '/access-denied',
    WILD_CARD: '*',
	LOG_IN: '/log-in',
};

interface IRoutes {
    INDEX: string;
    DASHBOARD: string;
    MANAGE_NODE: IManageNodeRoutes;
    /*EMULATION_PROJECT: IEmulationProjectRoutes;*/
    IMPORT_RESOURCE: string;
    RESOURCES: IResourcesRoutes;
    ACCESS_INTERFACE: string;
    WILD_CARD: string;
    ACCESS_DENIED: string;
	LOG_IN: string;
}

interface IManageNodeRoutes {
    ROOT: string;
    USERS: string;
    EMULATORS: string;
    /*RUNNING_TASKS: string;*/
    NODE_PREFERENCES: string;
    TROUBLESHOOTING: string;
}

/*interface IEmulationProjectRoutes {
    ROOT: string;
    DETAILS: string;
    OPTIONS: string;
    CREATE_BASE_ENVIRONMENT: string;
}*/

interface IResourcesRoutes {
    MY_RESOURCES: string;
    EXPLORE: string;
    SOFTWARE: string;
    ENVIRONMENT: string;
    CONTENT: string;
}
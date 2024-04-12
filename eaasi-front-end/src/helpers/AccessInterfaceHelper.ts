import { ROUTES } from '@/router/routes.const';

// Special symbolic ID for ephemeral environments
export const EPHEMERAL_ENVIRONMENT_ID: string = 'ephemeral-environment';

export function buildAccessInterfaceQuery(args: IAccessInterfaceQueryPayload): string {
    const { envId, softwareId, objectId, archiveId } = args;
    let path = ROUTES.ACCESS_INTERFACE;
    path += '/' + envId;
    if ((softwareId || objectId) && archiveId) {
        path += softwareId ? `?softwareId=${softwareId}` : `?objectId=${objectId}`;
        path += '&archiveId=' + archiveId;
    }
    return path;
}

export interface IAccessInterfaceQueryPayload {
    envId: string;
    softwareId?: string;
    objectId?: string;
    archiveId?: string;
    isTemporary?: boolean;
}
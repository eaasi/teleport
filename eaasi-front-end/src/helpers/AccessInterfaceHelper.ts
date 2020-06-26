import { ROUTES } from '@/router/routes.const';

export function buildAccessInterfaceQuery(args: IAccessInterfaceQueryPayload): string {
    const { envId, softwareId, objectId, archiveId, isTemporary } = args;
    let path = ROUTES.ACCESS_INTERFACE;
    let hasQuery: boolean = false;
    path += '/' + envId;
    if ((softwareId || objectId) && archiveId) {
        hasQuery = true;
        path += softwareId ? `?softwareId=${softwareId}` : `?objectId=${objectId}`;
        path += '&archiveId=' + archiveId;
    }
    if (isTemporary) {
        path += hasQuery ? '&' : '?';
        path += 'tmp=true';
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
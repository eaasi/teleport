import { ROUTES } from '@/router/routes.const';

export function buildAccessInterfaceQuery(envId: string, softwareId: string = null, objectId: string = null, archiveId: string = null): string {
    let path = ROUTES.ACCESS_INTERFACE;
    path += '/' + envId;
    if ((softwareId || objectId) && archiveId) {
        path += softwareId ? `?softwareId=${softwareId}` : `?objectId=${objectId}`;
        path += '&archiveId=' + archiveId;
    }
    return path;
}
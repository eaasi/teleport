import { IDefaultEmulators } from '@/types/IEmulator';
import { IEmulator } from 'eaasi-admin';

export default class EmulatorService {

	createEmulatorList(emulators: IDefaultEmulators, emulatorsMetaData: IEmulator[]): IEmulator[] {
		const list: IEmulator[] = [];
		emulators.emulators.forEach(em => {
			const metadata = emulatorsMetaData.find(metadata => metadata.name === em.eaasId) || {
				name: em.eaasId,
				entries: [],
				latestVersion: null
			};

			list.push({
				...metadata,
				id: em.eaasId
			});
		});
		return list;
	}

}
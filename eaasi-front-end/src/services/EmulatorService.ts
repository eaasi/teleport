import { EmulatorNamedIndexes, IDefaultEmulators } from '@/types/IEmulator';
import { IEmulator } from 'eaasi-admin';
import { AliasEntry } from '@/types/IEmulator';

export default class EmulatorService {

	createEmulatorList(emulators: IDefaultEmulators, indexes: EmulatorNamedIndexes): IEmulator[] {
		let list: IEmulator[] = [];
		let aliases = [];
		if (indexes.aliases && indexes.aliases.entry) {
			aliases = indexes.aliases.entry.map(x => x.value);
		}
		emulators.emulators.forEach(em => {
			let latestVersion = this._getLatestVersion(em.eaasId, aliases);
			let entries = [];
			if (indexes.entries && indexes.entries.entry) {
				entries = indexes.entries.entry.filter(x => x.key.indexOf(em.eaasId) > -1).map(x => x.value);
			}

			list.push({
				id: em.eaasId,
				name: em.eaasId,
				entries,
				latestVersion
			});
		});
		return list;
	}

	private _getLatestVersion(emulatorName: string, aliasList: AliasEntry[]): string | null {
		let aliasEntry = aliasList.find(x => x.name.indexOf(emulatorName) > -1 && x.alias === 'latest');
		if(!aliasEntry) return null;
		return aliasEntry.version;
	}
}
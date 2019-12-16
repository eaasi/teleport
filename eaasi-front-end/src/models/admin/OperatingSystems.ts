/**
 * Interface for osList.json static data
 */
export interface IOsListItem {
	id: string;
	puids: any[];
}

// This hard-coded list of IOsListItems is directly lifted from the static file
// returned from the eaas-server:  <eaas-host>/admin/osList.json
// the interface is a bit clumsy - 'puids' props contain a list of single-prop kv objects,
// each with puid key. // TODO: a more concise interface, like {id string; puids: string[]}
export const operatingSystems: IOsListItem[] = [
	{
		id: 'os:windows:xp:32bit',
		puids: [{ puid: 'x-fmt/411' },{ puid: 'fmt/899' }]
	},
	{
		id: 'os:windows:xp:64bit',
		puids: [{ puid: 'x-fmt/411' }, { puid: 'fmt/899' }, { puid: 'fmt/900' }]
	},
	{
		id: 'os:windows:9x',
		puids: [{ puid: 'x-fmt/410' }, { puid: 'x-fmt/409' }, { puid: 'x-fmt/411' }, { puid: 'fmt/899' }]
	},
	{
		id: 'os:windows:311',
		puids: [{ puid: 'x-fmt/410' }, { puid: 'x-fmt/409' }]
	},
	{
		id: 'os:dos',
		puids: [{ puid: 'x-fmt/409' }]
	},
	{
		id: 'os:mac:ppc',
		puids: [{ puid: 'bwfla/1' }, { puid: 'x-fmt/416' }]
	},
	{
		id: 'os:mac:mk68',
		puids: [{ puid: 'x-fmt/416' }]
	},
	{
		id: 'os:linux:x86:rpm',
		puids: [{ puid: 'fmt/689' }, { puid: 'fmt/795' }, { puid: 'fmt/79' }, { puid: 'fmt/793' }]
	}
];

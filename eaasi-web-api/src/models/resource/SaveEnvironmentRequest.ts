/**
 * Encapsulates a request to replicate / save an Environment
 */
export default class SaveEnvironmentRequest {
	/**
	 * Destination archive
	 */
	private destArchive: string;

	/**
	 * List of environmentIds to replicate
	 */
	private replicateList: string[];

	constructor(replicateList: string[], destArchive: string) {
		this.replicateList = replicateList;
		this.destArchive = destArchive;
	}

	addToReplicateList(envId: string) {
		this.replicateList.push(envId);
	}

	addMultipleToReplicateList(envIds: string[]) {
		return this.replicateList.slice().concat(envIds);
	}

	setDestArchive(destArchive: string) {
		this.destArchive = destArchive;
	}

	toJson() {
		return {
			replicateList: this.replicateList,
			destArchive: this.destArchive
		}
	}
}


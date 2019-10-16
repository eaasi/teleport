/**
 * Encapsulates a request to replicate / save an Environment
 */
class ReplicateImageRequest {
	/**
	 * Destination archive
	 */
	private destArchive: string;

	/**
	 * List of environmentIds to replicate
	 */
	private replicateList: string[];

	constructor(replicateList: string[], destArchive: string) {
		this.destArchive = destArchive;
		this.replicateList = replicateList;
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
}
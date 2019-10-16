class ReplicateImageRequest {
	private destArchive: string;
	private replicateList: string[];

	constructor(replicateList: string[], destArchive: string) {
		this.destArchive = destArchive;
		this.replicateList = replicateList;
	}

	addToReplicateList(envId: string) {
		
	}
}
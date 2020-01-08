import { ArchiveType, IReplicateEnvironmentRequest } from '@/types/resource/Resource';


/**
 * Encapsulates a request to replicate / save an Environment
 */
export default class ReplicateEnvironmentRequest {
	/**
	 * Destination archive
	 */
	private destArchive: ArchiveType;

	/**
	 * List of environmentIds to replicate
	 */
	private replicateList: string[];
	
	constructor(replicateRequest: IReplicateEnvironmentRequest) {
		this.replicateList = replicateRequest.replicateList;
		this.destArchive = replicateRequest.destArchive;
	}

	addToReplicateList(envId: string) {
		this.replicateList.push(envId);
	}

	addMultipleToReplicateList(envIds: string[]): string[] {
		return this.replicateList.slice().concat(envIds);
	}

	setDestArchive(destArchive: ArchiveType) {
		this.destArchive = destArchive;
	}

	toJson() {
		return {
			replicateList: this.replicateList,
			destArchive: this.destArchive
		}
	}
}


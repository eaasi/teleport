
export interface IAddHarvesterRequest {
	name: string;
	streams: IHarvesterStream[];
}

export interface IHarvesterStream {
	source: IHarvesterSource;
	sink: IHarvesterSink;
}

export interface IHarvesterSource {
	url: string;
	secret?: string;
}

export interface IHarvesterSink {
	base_url: string;
}

export interface IHarvesterSyncResult {
	num_records_downloaded: number;
	duration_seconds: number;
	start_timestamp: Date;
}
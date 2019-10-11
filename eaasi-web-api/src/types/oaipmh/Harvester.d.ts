
export interface HarvesterReq {
	name: string;
	streams: HarvesterStream[];
}

export interface HarvesterStream {
	source: HarvesterSource;
	sink: HarvesterSink;
}

export interface HarvesterSource {
	url: string;
}

export interface HarvesterSink {
	base_url: string;
}

export interface HarvesterSyncResult {
	num_records_downloaded: number;
	duration_seconds: number;
	start_timestamp: Date;
}
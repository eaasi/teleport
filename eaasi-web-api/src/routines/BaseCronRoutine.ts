import AppLogger from '@/logging/appLogger';
import { IAppLogger } from '@/types/general/log';
import { CronJob, CronTime } from 'cron';

export interface IBaseCronRoutine {
	start: () => void;
	stop: () => void;
	updateTime: (time: string) => void;
}

export default class BaseCronRoutine implements IBaseCronRoutine {

	protected job: CronJob;
	protected readonly _logger: IAppLogger;

	protected readonly routineName: string;

	constructor(routineName: string, logger: IAppLogger = AppLogger) {
		this.routineName = routineName;
		this._logger = logger;
	}

	setCronJob(timePattern: string, callback: () => void) {
		this.job = new CronJob(timePattern, callback);
		this._logger.log.info(`Constructed ${this.routineName} Routine. Time Pattern: ${timePattern} | Callback: ${JSON.stringify(callback())}`);
	}

	start(): void {
		if (!this.job.running) {
			this.job.start();
			this._logger.log.info(`Started ${this.routineName} Routine`);
		}
	}

	stop(): void {
		this.job.stop();
		this._logger.log.info(`Stopped ${this.routineName} Routine`);
	}

	updateTime(time: string): void {
		this.job.setTime(new CronTime(time));
		this._logger.log.info(`Updated time for ${this.routineName} Routine`);
	}

	addCallBack(callback: () => void) {
		this.job.addCallback(callback);
		this._logger.log.info(`Updated callback for ${this.routineName} Routine`);
	}

}
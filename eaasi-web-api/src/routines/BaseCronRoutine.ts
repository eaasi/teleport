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

	constructor(logger: IAppLogger = AppLogger) {
		this._logger = logger;
	}

	setCronJob(timePattern: string, callback: () => void) {
		this.job = new CronJob(timePattern, callback);
		this._logger.log.info('Cron job has been updated');
	}

	start(): void {
		if (!this.job.running) {
			this.job.start();
			this._logger.log.info('Cron job has been started');
		}
	}

	stop(): void {
		this.job.stop();
		this._logger.log.info('Cron job has been stoped');
	}

	updateTime(time: string): void {
		this.job.setTime(new CronTime(time));
		this._logger.log.info('Cron job has time has been updated');
	}

	addCallBack(callback: () => void) {
		this.job.addCallback(callback);
		this._logger.log.info('Cron job callback has been updated');
	}

}
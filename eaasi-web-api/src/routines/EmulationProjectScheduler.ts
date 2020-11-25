import EnvironmentService from '@/services/resource/EnvironmentService';
import TempEnvironmentService from '@/services/resource/TempEnvironmentService';
import { Op } from 'sequelize';
import BaseCronRoutine from './BaseCronRoutine';

export default class EmulationProjectRoutine extends BaseCronRoutine {

	// run five minutes after midnight, every day. Read more about cron patterns http://crontab.org/
	private readonly DEFAULT_TIME: string = '5 0 * * *';
	private readonly _tempEnvService: TempEnvironmentService;
	private readonly _environmentService: EnvironmentService;

	constructor(
		tempEnvService: TempEnvironmentService = new TempEnvironmentService(),
		environmentService: EnvironmentService = new EnvironmentService(),
	) {
		super();
		this._tempEnvService = tempEnvService;
		this._environmentService = environmentService;
		this.setCronJob(this.DEFAULT_TIME, this.cleanTempEnvironmentsCallback());
		this.start();
	}

	private cleanTempEnvironmentsCallback(): () => void {
		return async () => {
			try {
				const result = await this._tempEnvService.getAllWhere({});
				if (result.hasError) {
					this.handleError(result.error.toString());
				}
				const envIds = result.result.map(r => r.envId);
				// TODO: Check if any of the environments are currently running in the emulator
				const deleteResult = await this._tempEnvService.destroyAllWhere({ 
					envId: {
						[Op.in]: envIds
					}
				});
				if (deleteResult.hasError) {
					this.handleError(result.error.toString());
				}
				this._logger.log.info(`Cleanup of temporary environments. Deleted ${deleteResult.result} from temporary environment archive`);
				await Promise.all(envIds.map(envId => this._environmentService.deleteEnvironment(envId)));
			} catch (e) {
				this.handleError(e);
			}
		};
	}

	private handleError(err: string) {
		this._logger.log.error(err);
	}

}
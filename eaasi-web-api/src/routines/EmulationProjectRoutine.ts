import AppLogger from '@/logging/appLogger';
import EnvironmentService from '@/services/resource/EnvironmentService';
import TempEnvironmentService from '@/services/resource/TempEnvironmentService';
import EmulationProjectResourceService from '@/services/rest-api/EmulationProjectResourceService';
import EmulationProjectTaskSuccessorService from "@/services/rest-api/EmulationProjectTaskSuccessorService";
import { IEmulationProjectResource } from '@/types/emulation-porject/EmulationProject';
import { IAppLogger } from '@/types/general/log';
import { IEaasiTaskSuccessor } from '@/types/task/Task';
import { resourceTypes } from '@/utils/constants';
import { Op } from 'sequelize';
import BaseCronRoutine from './BaseCronRoutine';

export default class EmulationProjectRoutine {

	// run five minutes after midnight, every day. Read more about cron patterns http://crontab.org/
	private readonly FIVE_MINUTES_AFTER_MIDNIGHT: string = '5 0 * * *';
	private readonly EVERY_FIVE_MINUTES: string = '5 * * * * *';

	private readonly _tempEnvService: TempEnvironmentService;
	private readonly _environmentService: EnvironmentService;
	private readonly _successorService: EmulationProjectTaskSuccessorService;
	private readonly _emulationProjectResourceService: EmulationProjectResourceService;
	protected readonly _logger: IAppLogger;

	private readonly cleanTempEnvironmentsRoutine = new BaseCronRoutine('Clean Temporary Environments');
	private readonly autoAddEnvironmentsOnReplicateRoutine = new BaseCronRoutine('Auto Add Environments');

	constructor(
		tempEnvService = new TempEnvironmentService(),
		environmentService = new EnvironmentService(),
		logger: IAppLogger = AppLogger,
		successorService: EmulationProjectTaskSuccessorService = new EmulationProjectTaskSuccessorService(),
		emuProjResourceService = new EmulationProjectResourceService()
	) {
		this._tempEnvService = tempEnvService;
		this._environmentService = environmentService;
		this._logger = logger;
		this._successorService = successorService;
		this._emulationProjectResourceService = emuProjResourceService;
		this.constructCleanTempEnvironmentsRoutine();
		this.constructAutoAddEnvironmentsOnReplicateRoutine();
	}

	protected constructCleanTempEnvironmentsRoutine() {
		this.cleanTempEnvironmentsRoutine.setCronJob(this.FIVE_MINUTES_AFTER_MIDNIGHT, this.cleanTempEnvironmentsCallback());
		this.cleanTempEnvironmentsRoutine.start();
	}

	protected constructAutoAddEnvironmentsOnReplicateRoutine() {
		this.autoAddEnvironmentsOnReplicateRoutine.setCronJob(this.EVERY_FIVE_MINUTES, this.autoAddEnvironmentsOnReplicateCallback());
		this.autoAddEnvironmentsOnReplicateRoutine.start();
	}

	startAll() {
		this.cleanTempEnvironmentsRoutine.start();
		this.autoAddEnvironmentsOnReplicateRoutine.start();
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
			} catch(e) {
				this.handleError(e);
			}
		};
	}

	private autoAddEnvironmentsOnReplicateCallback(): () => void {
		return async () => {
			try {
				const successors = await this._successorService.getAllWithAssociations('add-after-replication');
				const successorsToExecute = successors.result.filter(s => s.task.isDone);
				for (const successor of successorsToExecute) {
					if (!successor.envId) {
						this.handleError(`Successor for task ${successor.taskId} can't be completed because it doesn't have environment id specified.`);
						await this.deleteSuccessor(successor);
						continue;
					}
					const payload: IEmulationProjectResource = {
						id: undefined,
						emulationProjectId: successor.emulationProjectId,
						resourceId: successor.envId,
						resourceType: resourceTypes.ENVIRONMENT
					};
					const res = await this._emulationProjectResourceService.create(payload);
					if (res.hasError) {
						this.handleError(res.error as string);
						continue;
					}
					await this.deleteSuccessor(successor);
				}
			} catch(e) {
				this.handleError(e);
			}
		}
	}

	protected async deleteSuccessor(successor: IEaasiTaskSuccessor): Promise<void> {
		await this._successorService.destroyAllWhere({
			taskId: successor.taskId,
			emulationProjectId: successor.emulationProjectId,
			userId: successor.userId
		});
	}

	private handleError(err: string) {
		this._logger.log.error(err);
	}

}
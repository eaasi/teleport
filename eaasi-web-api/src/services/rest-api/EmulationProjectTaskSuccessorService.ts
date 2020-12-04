import { EaasiTask } from "@/data_access/models/app";
import { EmulationProjectTaskSuccessor } from '@/data_access/models/app/EmulationProjectTaskSuccessor';
import CrudService from '@/services/base/CrudService';
import CrudServiceResult from "@/services/base/CrudServiceResult";
import ICrudServiceResult from "@/services/interfaces/ICrudServiceResult";
import { IEaasiTaskSuccessor, SuccessorType } from "@/types/task/Task";

export default class EmulationProjectTaskSuccessorService extends CrudService<EmulationProjectTaskSuccessor> {
	constructor() {
		super(EmulationProjectTaskSuccessor);
	}

	async getAllWithAssociations(type: SuccessorType): Promise<ICrudServiceResult<IEaasiTaskSuccessor[]>> {
		return await this.model
			.findAll({
				where: {
					type,
				},
				include: [
					{ model: EaasiTask }
				],
			})
			.then((result: IEaasiTaskSuccessor[]) => {
				return new CrudServiceResult<IEaasiTaskSuccessor[]>(null, result);
			}).catch((error: string) => {
				this._logger.log.error(error);
				return new CrudServiceResult<IEaasiTaskSuccessor>(error);
			})
	}
}
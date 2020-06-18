import BaseHttpService from './BaseHttpService';
import { IEmulationProject, IEmulationProjectResource } from '@/types/Emulation';

class EmulationProjectService extends BaseHttpService {

	/* Project
	============================================*/

    async getProject() {
		let res = await this.get<IEmulationProject>('/emulation-project/get-for-user');
		if(!res.ok) return null;
		return res.result;
	}

	async saveProject(project: IEmulationProject) {
		let res = await this.put<IEmulationProject>('/emulation-project', project);
		if(!res.ok) return null;
		return res.result;
	}

	/* Project Resources
	============================================*/

	async getResources(projectId: number): Promise<IEmulationProjectResource[]> {
		let res = await this.get<IEmulationProjectResource[]>(`/emulation-project/${projectId}/resources`);
		if(!res.ok) return null;
		return res.result;
	}

	async addResource(resource: IEmulationProjectResource) {
		let res = await this.post<IEmulationProjectResource>('/emulation-project-resource', resource);
		return res.ok ? res.result : null;
	}

	async removeResource(resource: IEmulationProjectResource) {
		let res = await this.delete<IEmulationProjectResource>(`/emulation-project-resource/${resource.id}`);
		return res.ok ? res.result : null;
	}

}

export default new EmulationProjectService();
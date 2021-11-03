import { IEmulationProject, IEmulationProjectResource } from '@/types/Emulation';
import { ResourceType } from '@/types/Resource';
import { IEaasiTaskSuccessor } from '@/types/Task';
import BaseHttpService from './BaseHttpService';

class EmulationProjectService extends BaseHttpService {

	/* Project
	============================================*/

    async getProject(userId: string) {
		const res = await this.get<IEmulationProject>('/emulation-project/get-for-user?userId=' + userId);
		if(!res.ok) return null;
		return res.result;
	}

	async saveProject(project: IEmulationProject) {
		const res = await this.put<IEmulationProject>('/emulation-project', project);
		if(!res.ok) return null;
		return res.result;
	}

	/* Project Resources
	============================================*/

	async getResources(projectId: number): Promise<IEmulationProjectResource[]> {
		const res = await this.get<IEmulationProjectResource[]>(`/emulation-project/${projectId}/resources`);
		if(!res.ok) return null;
		return res.result;
	}

	async addResource(resource: IEmulationProjectResource) {
		const url = `/emulation-project/${resource.emulationProjectId}/resources`;
		const res = await this.post<IEmulationProjectResource>(url, resource);
		return res.ok ? res.result : null;
	}

	async addResources(resources: IEmulationProjectResource[]) {
		const results = await Promise.all(resources.map((resource) => {
			return this.addResource(resource);
		}));
		return !results.some(x => x === null);
	}

	async removeResource(projectId: number, resourceId: string) {
		const url = `/emulation-project/${projectId}/resources/${resourceId}`;
		const res = await this.delete<IEmulationProjectResource>(url);
		return res.ok ? res.result : null;
	}

	async removeResourcesOfType(projectId: number, resourceTypes: ResourceType[]) {
		const url = `/emulation-project/${projectId}/delete-resources`;
		const res = await this.post<IEmulationProjectResource[]>(url, resourceTypes);
		return res.ok ? res.result : null;
	}

	async clearAll(projectId: number): Promise<boolean> {
		const url = `/emulation-project/${projectId}/clear-all`;
		const res = await this.delete<boolean>(url);
		return res.ok ? res.result : null;
	}

	/* Task Successors
	============================================*/
	async addTaskSuccessor(payload: IEaasiTaskSuccessor) {
		const res = await this.post<IEaasiTaskSuccessor>('/emulation-project/add-task-successor', payload);
		return res.ok ? res.result : null;
	}

}

export default new EmulationProjectService();
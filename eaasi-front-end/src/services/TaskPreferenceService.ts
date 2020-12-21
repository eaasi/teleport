import UserPreferenceService from './UserPreferenceService';

export default class TaskPreferenceService extends UserPreferenceService {

    protected readonly CLOSED_KEY: string = 'TASK_RUNNER_CLOSED';
	protected readonly COLLAPSED_KEY: string = 'TASK_RUNNER_COLLAPSED';

    constructor() {
        super();
    }

    retrieveTaskPreferences(): TaskUserPreferences {
        return {
            closed: this.retrieveUserSetting(this.CLOSED_KEY),
            collapsed: this.retrieveUserSetting(this.COLLAPSED_KEY),
        };
	}

	persistTaskClosePreference(closed: boolean) {
        if (typeof closed != 'boolean') return;
        this.persistUserPreference(this.CLOSED_KEY, closed);
	}

	persistTaskCollapsePreference(collapsed: boolean) {
        if (typeof collapsed != 'boolean') return;
        this.persistUserPreference(this.COLLAPSED_KEY, collapsed);
    }

}

export interface TaskUserPreferences {
    collapsed: boolean;
    closed: boolean;
}
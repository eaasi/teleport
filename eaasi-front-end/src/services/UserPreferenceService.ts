
export default class UserPreferenceService {

    constructor() { }
    
    protected persistUserPreference(key: string, value: any): void {
        const valueJson: string = typeof value === 'string' ? value : JSON.stringify(value);
        localStorage.setItem(key, valueJson);
    }

    protected retrieveUserSetting<T>(key: string): T {
        const valueJson: string = localStorage.getItem(key);
        if (!valueJson) return null;
        return JSON.parse(valueJson) as T;
    }

}
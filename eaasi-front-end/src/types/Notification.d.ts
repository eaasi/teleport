export interface INotification {
    label: string;
    time: number; // in milliseconds
    id: string;
    type: NotificationType;
    notificationActions?: INotificationAction[];
}

export interface INotificationAction {
    actionName: string;
    action: Function;
}

export type NotificationType = 'success' | 'info' | 'danger' | 'warning';
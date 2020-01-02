export interface INotification {
    label: string;
    time: number; // in milliseconds
    id: string;
    type: NotificationType;
}

export type NotificationType = 'success' | 'info' | 'danger' | 'warning';
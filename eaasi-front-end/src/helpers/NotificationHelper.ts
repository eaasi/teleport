/*
import EaasiTask from '@/models/task/EaasiTask';
import { INotification } from '@/types/Notification';
import { generateId } from '@/utils/functions';

export function generateTaskNotification(task: EaasiTask): INotification {
    const notification: INotification = {
        id: generateId(),
        label: 'Failed to create a task.',
        time: 5000,
        type: 'danger'
    };
    if (task.status === '0' || task.taskId) {
        notification.type = 'success';
        notification.label = `Task ${task.description ? task.description : task.taskId} created successfully!.`;
    }
    return notification;
}

export function generateCompletedTaskNotification(task: EaasiTask): INotification {
    const notification: INotification = {
        id: generateId(),
        label: `Task ${task.description ? task.description : task.taskId} is now completed.`,
        time: 5000,
        type: 'success'
    };
    return notification;
}

export function generateNotificationSuccess(message: string, time: number = 5000): INotification {
    const notification: INotification = {
        id: generateId(),
        label: message,
        time: time,
        type: 'success'
    };
    return notification;
}

export function generateNotificationError(message: string): INotification {
    const notification: INotification = {
        id: generateId(),
        label: message,
        time: 5000,
        type: 'danger'
    };
    return notification;
}

export function generateNotificationWarning(message: string): INotification {
    const notification: INotification = {
        id: generateId(),
        label: message,
        time: 5000,
        type: 'warning'
    };
    return notification;
}*/

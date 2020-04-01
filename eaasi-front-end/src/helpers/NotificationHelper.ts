import EaasiTask from '@/models/task/EaasiTask';
import { INotification } from '@/types/Notification';
import { generateId } from '@/utils/functions';

export function generateTaskNotification(task: EaasiTask): INotification {
    let notification: INotification = {
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
    let notification: INotification = {
        id: generateId(),
        label: `Task ${task.description ? task.description : task.taskId} is now completed.`,
        time: 5000,
        type: 'success'
    };
    return notification;
}

export function generateCompletedNotificationWithMessage(message: string): INotification {
    let notification: INotification = {
        id: generateId(),
        label: message,
        time: 5000,
        type: 'success'
    };
    return notification;
}

export function generateNotificationError(message: string): INotification {
    let notification: INotification = {
        id: generateId(),
        label: message,
        time: 5000,
        type: 'danger'
    };
    return notification;
}
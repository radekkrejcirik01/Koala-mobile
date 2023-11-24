import { EmotionInterface } from '@interfaces/general.interface';

export interface ReducerProps {
    user: User;
    newAccount: NewAccount;
    notifications: Notifications;
}

export interface User {
    token: string;
    user: {
        id: number;
        name: string;
        username: string;
        profilePhoto: string;
    };
    emotions: EmotionInterface[];
}

export interface NewAccount {
    name: string;
    username: string;
}

export interface Notifications {
    unseenNotifications: number;
}

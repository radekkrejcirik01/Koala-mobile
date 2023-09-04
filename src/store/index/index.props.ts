export interface ReducerProps {
    user: User;
    newAccount: NewAccount;
    notifications: Notifications;
}

export interface User {
    token: string;
    user: {
        name: string;
        username: string;
        profilePhoto: string;
    };
}

export interface NewAccount {
    name: string;
    username: string;
}

export interface Notifications {
    unseenNotifications: number;
}

export interface UserInterface {
    name: string;
    username: string;
}

export interface NotificationInterface {
    id: number;
    sender: string;
    name: string;
    message: string;
    type: string;
    liked?: number;
    time: number;
}

export interface HistoryInterface {
    id: number;
    receiversNames: string[];
    message: string;
    time: number;
}

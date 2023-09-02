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
    time: number;
}

export interface HistoryInterface {
    id: number;
    sender: string;
    receiverName: string[];
    message: string;
    type: string;
    time: number;
}

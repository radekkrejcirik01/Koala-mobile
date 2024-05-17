export interface RepliesProps {
    onPressReply: (message: string) => void;
}

export interface ReplyInterface {
    id: number;
    message: string;
    isDefault?: boolean;
}

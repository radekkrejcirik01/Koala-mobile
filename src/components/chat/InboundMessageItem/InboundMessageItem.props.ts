export interface InboundMessageItemProps {
    name: string;
    children: string;
    onLongPress: () => void;
    time: number;
    replyMessage: string;
    audioMessage: string;
    isLast: boolean;
}

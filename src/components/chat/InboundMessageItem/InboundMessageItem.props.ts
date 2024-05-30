export interface InboundMessageItemProps {
    name: string;
    children: string;
    onLongPress: () => void;
    replyMessage: string;
    audioMessage: string;
    isFirst: boolean;
}

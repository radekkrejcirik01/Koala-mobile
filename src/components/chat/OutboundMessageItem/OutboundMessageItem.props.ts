export interface OutboundMessageItemProps {
    children: string;
    onLongPress: () => void;
    time: number;
    replyMessage: string;
    audioMessage: string;
    onPlayAudioMessage: () => void;
}

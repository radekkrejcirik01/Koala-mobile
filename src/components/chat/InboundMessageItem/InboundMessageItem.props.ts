export interface InboundMessageItemProps {
    children: string;
    onLongPress: () => void;
    time: number;
    replyMessage: string;
    isAudioMessage: boolean;
    onPlayAudioMessage: () => void;
}

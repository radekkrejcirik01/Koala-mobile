export interface AudioMessageItemProps {
    onPlayAudioMessage: () => void;
    outbound?: boolean;
}

export const AudioMessageItemDefaultProps: Omit<
    AudioMessageItemProps,
    'onPlayAudioMessage'
> = {
    outbound: false
};

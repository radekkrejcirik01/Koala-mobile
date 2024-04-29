export interface AudioMessageItemProps {
    audioMessage: string;
    outbound?: boolean;
}

export const AudioMessageItemDefaultProps: Omit<
    AudioMessageItemProps,
    'audioMessage'
> = {
    outbound: false
};

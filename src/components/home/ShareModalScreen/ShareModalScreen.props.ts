import { EmotionInterface } from '@interfaces/general.interface';

export interface ShareModalScreenProps {
    item: EmotionInterface;
    onAddFriendPress: () => void;
    isKudos?: boolean;
}

export const ShareModalScreenDefaultProps: Omit<
    ShareModalScreenProps,
    'item' | 'onAddFriendPress'
> = {
    isKudos: false
};

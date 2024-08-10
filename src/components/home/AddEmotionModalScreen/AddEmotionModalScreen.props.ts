import { AddEmotionModalScreenEnum } from '@components/home/AddEmotionModalScreen/AddEmotionModalScreen.enum';

export interface AddEmotionModalScreenProps {
    onAdded: () => void;
    type: AddEmotionModalScreenEnum;
}

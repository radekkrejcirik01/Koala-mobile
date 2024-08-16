import { EmotionScreenMessageType } from '@enums/EmotionScreenMessageType';

export interface AddEmotionModalScreenProps {
    onAdded: () => void;
    type: EmotionScreenMessageType;
}

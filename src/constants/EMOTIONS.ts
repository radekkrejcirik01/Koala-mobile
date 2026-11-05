import { EmotionType } from '@enums/EmotionType';
import COLORS from '@constants/COLORS';

export interface EmotionConfig {
  type: EmotionType;
  label: string;
  message: string;
  color: string;
}

export const EMOTIONS: EmotionConfig[] = [
  {
    type: EmotionType.SuperGood,
    label: 'Super good',
    message: 'Super good',
    color: COLORS.EMOTION_SUPER_GOOD
  },
  {
    type: EmotionType.Good,
    label: 'Good',
    message: 'Good',
    color: COLORS.EMOTION_GOOD
  },
  {
    type: EmotionType.Meh,
    label: 'Meh',
    message: 'Meh',
    color: COLORS.EMOTION_MEH
  },
  {
    type: EmotionType.NotGood,
    label: 'Sad',
    message: 'Not good',
    color: COLORS.EMOTION_NOT_GOOD
  },
  {
    type: EmotionType.Miserable,
    label: 'Miserable',
    message: 'Miserable',
    color: COLORS.EMOTION_MISERABLE
  }
];

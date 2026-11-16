import { EmotionType } from '@enums/EmotionType';
import COLORS from '@constants/COLORS';

export interface EmotionConfig {
  type: EmotionType;
  message: string;
  color: string;
}

export const EMOTIONS: EmotionConfig[] = [
  {
    type: EmotionType.SuperGood,
    message: 'Super good',
    color: COLORS.EMOTION_SUPER_GOOD
  },
  {
    type: EmotionType.Good,
    message: 'Good',
    color: COLORS.EMOTION_GOOD
  },
  {
    type: EmotionType.Meh,
    message: 'Meh',
    color: COLORS.EMOTION_MEH
  },
  {
    type: EmotionType.NotGood,
    message: 'Not good',
    color: COLORS.EMOTION_NOT_GOOD
  },
  {
    type: EmotionType.ReallyBad,
    message: 'Really bad',
    color: COLORS.EMOTION_MISERABLE
  }
];

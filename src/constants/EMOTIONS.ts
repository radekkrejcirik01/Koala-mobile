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
    type: EmotionType.Bad,
    message: 'Bad',
    color: COLORS.EMOTION_BAD
  },
  {
    type: EmotionType.ReallyBad,
    message: 'Awful',
    color: COLORS.EMOTION_MISERABLE
  }
];

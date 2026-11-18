import { EmotionType } from '@enums/EmotionType';
import COLORS from '@constants/COLORS';

export interface EmotionConfig {
  type: EmotionType;
  message: string;
  color: string;
}

export const EMOTIONS: EmotionConfig[] = [
  {
    type: EmotionType.SuperHappy,
    message: 'Good',
    color: COLORS.EMOTION_SUPER_HAPPY
  },
  {
    type: EmotionType.Sad,
    message: 'Not good',
    color: COLORS.EMOTION_SAD
  },
  {
    type: EmotionType.Anxious,
    message: 'Anxious',
    color: COLORS.EMOTION_ANXIOUS
  },
  {
    type: EmotionType.Depressed,
    message: 'Depressed',
    color: COLORS.EMOTION_DEPRESSED
  },
  {
    type: EmotionType.Angry,
    message: 'Angry',
    color: COLORS.EMOTION_ANGRY
  },
  {
    type: EmotionType.Tired,
    message: 'Tired',
    color: COLORS.EMOTION_TIRED
  }
];

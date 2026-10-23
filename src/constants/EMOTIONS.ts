import { EmotionType } from '@enums/EmotionType';

export interface EmotionConfig {
  type: EmotionType;
  message: string;
}

export const EMOTIONS: EmotionConfig[] = [
  { type: EmotionType.FeelingGood, message: 'I am feeling good! 😊' },
  { type: EmotionType.FeelingBad, message: 'I am feeling bad... 😔' },
  { type: EmotionType.Angry, message: "I'm angry! 😠" },
  { type: EmotionType.Tired, message: "I'm tired... 😴" },
  { type: EmotionType.HeadHurts, message: 'My head hurts... 🤕' }
];

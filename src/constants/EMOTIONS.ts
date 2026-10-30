import { EmotionType } from '@enums/EmotionType';

export interface EmotionConfig {
  type: EmotionType;
  label: string;
  message: string;
}

export const EMOTIONS: EmotionConfig[] = [
  {
    type: EmotionType.SuperGood,
    label: 'Super good',
    message: 'Super good'
  },
  {
    type: EmotionType.Good,
    label: 'Good',
    message: 'Good'
  },
  {
    type: EmotionType.Meh,
    label: 'Meh',
    message: 'Meh'
  },
  { type: EmotionType.NotGood, label: 'Sad', message: 'Not good' },
  { type: EmotionType.Miserable, label: 'Miserable', message: 'Miserable' }
];

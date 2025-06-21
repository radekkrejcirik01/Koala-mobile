import { EmotionInterface } from '@interfaces/general.interface';
import { EmotionScreenMessageType } from '@enums/EmotionScreenMessageType';

export const KUDOS_MESSAGES: EmotionInterface[] = [
  {
    id: 1,
    message: 'You are doing great!',
    type: EmotionScreenMessageType.Kudos,
    isDefault: true
  },
  {
    id: 2,
    message: 'So proud of you!',
    type: EmotionScreenMessageType.Kudos,
    isDefault: true
  },
  {
    id: 3,
    message: 'I am here for you',
    type: EmotionScreenMessageType.Kudos,
    isDefault: true
  },
  {
    id: 4,
    message: 'Nobody is better than you!',
    type: EmotionScreenMessageType.Kudos,
    isDefault: true
  },
  {
    id: 5,
    message: 'You are the most special person!',
    type: EmotionScreenMessageType.Kudos,
    isDefault: true
  },
  {
    id: 6,
    message: 'Sending hugs 🥰',
    type: EmotionScreenMessageType.Kudos,
    isDefault: true
  },
  {
    id: 7,
    message: 'Let me know if you need anything 🤍',
    type: EmotionScreenMessageType.Kudos,
    isDefault: true
  }
];

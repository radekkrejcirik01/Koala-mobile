import { EmotionInterface } from '@interfaces/general.interface';
import { Platform } from 'react-native';
import { EmotionScreenMessageType } from '@enums/EmotionScreenMessageType';

export const WELLBEING_MESSAGES: EmotionInterface[] = [
  {
    id: 1,
    message: 'I WANT TO GO HOME',
    tip1: 'Put your headphones on and pretend you are somewhere else',
    tip2: 'Think of how you will reward yourself when you finally come home',
    type: EmotionScreenMessageType.Wellbeing,
    isDefault: true
  },
  {
    id: 2,
    message:
      Platform.OS === 'ios'
        ? 'Today is ass, sucks, fucking terrible'
        : 'Today is a**, sucks, f***ing terrible',
    tip1: 'Call your friend and tell them everything',
    tip2: 'Have your guilty pleasure, whatever it is',
    type: EmotionScreenMessageType.Wellbeing,
    isDefault: true
  },
  {
    id: 3,
    message: 'My head is completely overwhelmed',
    tip1: 'Focus only on one important thing',
    tip2: 'Asking for a help is not shameful',
    type: EmotionScreenMessageType.Wellbeing,
    isDefault: true
  },
  {
    id: 4,
    message:
      Platform.OS === 'ios' ? 'I am so fucking tired' : 'I am so f***ing tired',
    tip1: 'Take that nap 😴🛌',
    tip2: 'Take a break, day off, week off',
    type: EmotionScreenMessageType.Wellbeing,
    isDefault: true
  },
  {
    id: 5,
    message: `I don't feel good at all`,
    tip1: 'Go have some good sweet treatment',
    tip2: 'Think of your favorite person',
    type: EmotionScreenMessageType.Wellbeing,
    isDefault: true
  },
  {
    id: 6,
    message:
      Platform.OS === 'ios' ? `I can't fucking sleep` : `I can't f***ing sleep`,
    tip1: `Think about anything but how you can't sleep`,
    tip2: 'Good old counting sheep 🐑',
    type: EmotionScreenMessageType.Wellbeing,
    isDefault: true
  },
  {
    id: 7,
    message: `I don't feel like doing anything today`,
    tip1: `Do the bare minimum`,
    tip2: 'Think of the good thinks that are about to come',
    type: EmotionScreenMessageType.Wellbeing,
    isDefault: true
  }
];

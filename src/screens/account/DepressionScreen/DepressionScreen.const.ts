import { EmotionInterface } from '@interfaces/general.interface';

export const DEPRESSION_MESSAGES: EmotionInterface[] = [
    {
        id: 1,
        message: 'I have a depressive episode',
        tip1: 'Positive thinking will help your brain feel better',
        tip2: 'Think about the small things that are good rn in your life',
        isDefault: true
    },
    {
        id: 2,
        message: 'I have no motivation AT ALL',
        tip1: 'Think of all good things that will come if you keep going',
        tip2: 'Take a whole day off',
        isDefault: true
    },
    {
        id: 3,
        message: 'I have an existential crisis',
        tip1: `Focus on one skill you enjoy the best. If you don't have one yet put finding it as purpose. It will turn the life into happy place and money will come with it`,
        tip2: 'Travel, seriously, it opens world you have no idea that exists',
        isDefault: true
    },
    {
        id: 4,
        message: `I don't see sense in anything`,
        tip1: `Think about the good things that will happen in near future`,
        tip2: 'Learning new skill, new hobby, meeting new people, traveling new places is so helpful with changing perspective',
        isDefault: true
    },
    {
        id: 5,
        message: `I can't get up from my bed`,
        tip1: `Staying as long you need, it is okay`,
        tip2: 'Think about coffee you can have if you get up ☕️',
        isDefault: true
    }
];

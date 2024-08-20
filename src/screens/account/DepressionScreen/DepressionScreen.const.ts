import { EmotionInterface } from '@interfaces/general.interface';
import { EmotionScreenMessageType } from '@enums/EmotionScreenMessageType';

export const DEPRESSION_MESSAGES: EmotionInterface[] = [
    {
        id: 1,
        message: 'I have a depressive episode',
        tip1: 'Positive thinking helps your brain feel better',
        tip2: 'Think about the small things that are good in your life',
        type: EmotionScreenMessageType.Depression,
        isDefault: true
    },
    {
        id: 2,
        message: 'I have no motivation AT ALL',
        tip1: 'Think of all good things that will come if you keep going',
        tip2: 'Take a whole day off',
        type: EmotionScreenMessageType.Depression,
        isDefault: true
    },
    {
        id: 3,
        message: 'I have an existential crisis',
        tip1: `Focus on one skill you enjoy the best. If you don't have one yet put finding it as purpose. It will turn the life into happy place and money will come with it`,
        tip2: 'Travel, seriously, it opens world you have no idea that exists',
        type: EmotionScreenMessageType.Depression,
        isDefault: true
    },
    {
        id: 4,
        message: `I don't see sense in anything`,
        tip1: `Think about the good things that will happen in near future`,
        tip2: 'Learning new skill, new hobby, meeting new people, traveling new places is so helpful with changing perspective',
        type: EmotionScreenMessageType.Depression,
        isDefault: true
    },
    {
        id: 5,
        message: `I can't get up from my bed`,
        tip1: `Staying as long you need, it is okay`,
        tip2: 'Think about coffee you can have if you get up ☕️',
        type: EmotionScreenMessageType.Depression,
        isDefault: true
    },
    {
        id: 6,
        message: `I can barely function`,
        tip1: `Take it easy as much you can`,
        tip2: 'Think about achieving that one thing you always wanted',
        type: EmotionScreenMessageType.Depression,
        isDefault: true
    },
    {
        id: 7,
        message: 'I have trouble to eat',
        tip1: 'Having a piece of a fruit is soo good and healing',
        tip2: 'Talk about it with person you trust the best',
        type: EmotionScreenMessageType.Depression,
        isDefault: true
    }
];

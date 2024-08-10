import { EmotionInterface } from '@interfaces/general.interface';

export const ANXIETY_AND_PANIC_MESSAGES: EmotionInterface[] = [
    {
        id: 1,
        message: 'I have an anxiety',
        tip1: 'Close your eyes, take a deep deep breath',
        tip2: 'Little walk is always helpful',
        isDefault: true
    },
    {
        id: 2,
        message: 'I am having a panic attack',
        tip1: 'Count from 100 to 0',
        tip2: 'Think of a happy childhood memory',
        isDefault: true
    },
    {
        id: 3,
        message: 'I woke up with an anxiety, it physically hurts',
        tip1: 'A morning walk outside with fresh air is greatly helpful',
        tip2: 'Change whatever can cause the anxiety, if it is a job, quit it, there is no tolerance for anxiety caused by 9-5 in this house',
        isDefault: true
    },
    {
        id: 4,
        message: `There is too many people around me and I don't like it`,
        tip1: 'Put on headphones and pretend you are somewhere else',
        tip2: 'Remember that everybody are thinking only about themselves',
        isDefault: true
    },
    {
        id: 5,
        message: `I can't function right now because of my anxiety`,
        tip1: 'Try to do something else for a while',
        tip2: 'Complain about your anxiety with a friend',
        isDefault: true
    },
    {
        id: 6,
        message: `I feel a fear and worry`,
        tip1: 'Remember that anxiety is lying to you',
        tip2: 'Talk about it with close ones',
        isDefault: true
    },
    {
        id: 7,
        message: `I have derealization`,
        tip1: 'Know that this feeling is just your brain trying protect you',
        tip2: `Remember that it's just a feeling and it will go away`,
        isDefault: true
    }
];

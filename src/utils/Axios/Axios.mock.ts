import { AxiosRequestConfig, AxiosResponse } from 'axios';
import moment from 'moment';
import { EmotionType } from '@enums/EmotionType';
import { EMOTIONS } from '@constants/EMOTIONS';
import { MessageType } from '@enums/MessageType';
import { ChatActivityType } from '@enums/ChatActivityType';
import { SUPPORT_REACTION } from '@constants/SUPPORT_REACTION';

// Fake backend for App Store screenshots, enable via MOCK_DATA in Axios.instance
const BASE_URL =
  'https://f8g89472ta.execute-api.eu-central-1.amazonaws.com/koala/';

const avatar = (seed: string): string =>
  `https://randomuser.me/api/portraits/${seed}.jpg`;

const ago = (minutes: number): number =>
  moment().subtract(minutes, 'minutes').unix();

const ME = {
  id: 1,
  name: 'Ema',
  username: 'ema',
  profilePhoto: avatar('women/3')
};

const FRIENDS = [
  { id: 2, name: 'Lucas', username: 'lucas', profilePhoto: avatar('men/4') },
  { id: 3, name: 'Sofia', username: 'sofia', profilePhoto: avatar('women/27') },
  { id: 4, name: 'Noah', username: 'noah', profilePhoto: avatar('men/22') },
  { id: 5, name: 'Mia', username: 'mia', profilePhoto: avatar('women/19') },
  { id: 6, name: 'Oliver', username: 'oliver', profilePhoto: avatar('men/1') },
  {
    id: 7,
    name: 'Hannah',
    username: 'hannah',
    profilePhoto: avatar('women/2')
  },
  { id: 8, name: 'Leo', username: 'leo', profilePhoto: avatar('men/18') },
  { id: 9, name: 'Clara', username: 'clara', profilePhoto: avatar('women/30') }
];

const friend = (id: number) => FRIENDS.find((item) => item.id === id);

type Message = [senderId: number, message: string, reaction?: string];

interface Chat {
  id: number;
  friendId: number;
  // Who shared the mood that started the chat, the other one supported it
  sharedBy: number;
  // Leaves the mood without support, showing the support button
  unsupported?: boolean;
  emotion: EmotionType;
  feeling: string;
  minutesAgo: number;
  seen: number;
  messages: Message[];
}

const CHATS: Chat[] = [
  {
    id: 1,
    friendId: 3,
    sharedBy: 3,
    emotion: EmotionType.SuperGood,
    feeling: 'Super good',
    minutesAgo: 4,
    seen: 0,
    messages: [
      [3, 'Guess what...'],
      [3, 'Got the job!!! 🎉', '❤️'],
      [1, 'NO WAY 😍 I knew you would nail it!'],
      [1, 'We are celebrating this weekend, no excuses'],
      [3, 'Deal 🥂 thank you for believing in me']
    ]
  },
  {
    id: 2,
    friendId: 2,
    sharedBy: 1,
    emotion: EmotionType.Good,
    feeling: 'Good',
    minutesAgo: 38,
    seen: 0,
    messages: [
      [2, 'Love to see it! What made your day?'],
      [1, 'Finally finished the big project 🙌'],
      [2, 'Coffee tomorrow? ☕️']
    ]
  },
  {
    id: 3,
    friendId: 5,
    sharedBy: 5,
    emotion: EmotionType.NotGood,
    feeling: 'Not good',
    minutesAgo: 95,
    seen: 1,
    messages: [
      [5, 'Thank you 🥹 rough day at work'],
      [1, 'Want to go for a walk later? I am free after 6'],
      [5, 'Yes please, that would help a lot', '🫶']
    ]
  },
  {
    id: 4,
    friendId: 9,
    sharedBy: 9,
    unsupported: true,
    emotion: EmotionType.SuperGood,
    feeling: 'Super good',
    minutesAgo: 180,
    seen: 0,
    messages: [
      [9, 'Just landed in Lisbon ✈️'],
      [9, 'The weather is unreal ☀️']
    ]
  },
  {
    id: 5,
    friendId: 4,
    sharedBy: 4,
    emotion: EmotionType.Meh,
    feeling: 'Meh',
    minutesAgo: 60 * 26,
    seen: 1,
    messages: [
      [1, 'Hey, everything ok?'],
      [4, 'Just tired, exam week 😮‍💨'],
      [1, 'You have got this. Dinner on me after?'],
      [4, 'Thanks for checking on me, means a lot 💛']
    ]
  },
  {
    id: 6,
    friendId: 7,
    sharedBy: 7,
    emotion: EmotionType.Good,
    feeling: 'Good',
    minutesAgo: 60 * 30,
    seen: 1,
    messages: [
      [7, 'Ran my first half marathon today 🏃‍♀️'],
      [1, 'Proud of you, seriously']
    ]
  },
  {
    id: 7,
    friendId: 6,
    sharedBy: 6,
    emotion: EmotionType.Meh,
    feeling: 'Meh',
    minutesAgo: 60 * 52,
    seen: 1,
    messages: [[6, 'Long day but the sunset made up for it 🌅']]
  },
  {
    id: 8,
    friendId: 8,
    sharedBy: 1,
    emotion: EmotionType.SuperGood,
    feeling: 'Super good',
    minutesAgo: 60 * 75,
    seen: 1,
    messages: [
      [8, 'Love seeing you this happy!'],
      [1, 'See you on Saturday!']
    ]
  }
];

// Oldest first, the endpoint reverses it
const getMessages = (chat: Chat) => {
  const start = chat.minutesAgo + chat.messages.length + 2;
  const emotionId = chat.id * 100;

  return [
    {
      id: emotionId,
      type: MessageType.Emotion,
      senderId: chat.sharedBy,
      emotion: chat.emotion,
      message: chat.feeling,
      reaction: chat.unsupported ? undefined : SUPPORT_REACTION,
      time: ago(start)
    },
    ...chat.messages.map(
      ([senderId, message, reaction]: Message, index: number) => ({
        id: emotionId + 2 + index,
        type: MessageType.Message,
        senderId,
        message,
        reaction,
        time: ago(start - 2 - index)
      })
    )
  ];
};

const CHAT_LIST = CHATS.map((chat: Chat) => {
  const messages = getMessages(chat);
  const message = messages[messages.length - 1];

  return {
    id: chat.id,
    friend: friend(chat.friendId),
    lastActivity: {
      type: ChatActivityType.Message,
      userId: message.senderId,
      timeMs: message.time * 1000,
      message
    },
    unread: !chat.seen
  };
});

const INVITES = [
  { id: 10, username: 'charlie', profilePhoto: avatar('men/32') }
];

// Deterministic, balanced moods so stats look the same on every capture
const MOOD_PATTERN = [
  EmotionType.SuperGood,
  EmotionType.NotGood,
  EmotionType.Good,
  EmotionType.Meh,
  EmotionType.SuperGood,
  EmotionType.Miserable,
  EmotionType.Good,
  EmotionType.Meh,
  EmotionType.NotGood,
  EmotionType.SuperGood,
  EmotionType.Good,
  EmotionType.Meh,
  EmotionType.NotGood,
  EmotionType.Good,
  EmotionType.Miserable,
  EmotionType.SuperGood,
  EmotionType.Good
];

const getEmotions = (from: number, to: number) => {
  const end = Math.min(to, moment().unix());
  const emotions = [];
  let day = moment.unix(from);
  let index = 0;

  while (day.unix() < end) {
    const seed = day.dayOfYear();
    const count = 2 + ((seed * 7) % 3);
    for (let i = 0; i < count; i += 1) {
      const time = day
        .clone()
        .add(7 + i * 3, 'hours')
        .add((seed * 13 + i * 17) % 50, 'minutes')
        .unix();
      if (time < end) {
        const emotion = MOOD_PATTERN[(seed * 3 + i * 5) % MOOD_PATTERN.length];
        emotions.push({
          id: index,
          emotion,
          // The app sends the emotion's label, there are no custom messages
          message: EMOTIONS.find((item) => item.type === emotion).message,
          time
        });
        index += 1;
      }
    }
    day = day.add(1, 'day');
  }

  return emotions;
};

const success = (data: Record<string, unknown> = {}) => ({
  status: 'success',
  message: 'ok',
  ...data
});

const route = (method: string, endpoint: string) => {
  const [path, query] = endpoint.split('?');
  // URLSearchParams.get isn't implemented in React Native
  const params: Record<string, string> = Object.fromEntries(
    (query ?? '').split('&').map((pair: string) => pair.split('='))
  );

  if (method !== 'get') {
    return success();
  }
  if (path === 'user') {
    return success({ data: ME });
  }
  if (path === 'friends') {
    return success({ data: FRIENDS });
  }
  if (path === 'invites') {
    return success({ data: INVITES });
  }
  if (path === 'chats/unread') {
    return success({
      unreadChats: CHAT_LIST.filter((item) => item.unread).length
    });
  }
  // Everything fits the first page, a later page is empty
  if (path === 'chats') {
    return success(params.lastId ? {} : { data: CHAT_LIST });
  }
  if (/^chats\/\d+\/messages$/.test(path)) {
    const chat = CHATS.find(
      (item: Chat) => item.friendId === Number(path.split('/')[1])
    );
    return success(
      chat && !params.lastId ? { data: getMessages(chat).reverse() } : {}
    );
  }
  if (path.startsWith('last-online/')) {
    return success({ time: ago(1) });
  }
  if (path === 'emotions') {
    return success({
      data: getEmotions(Number(params.from), Number(params.to))
    });
  }
  return success();
};

export const mockAdapter = (
  config: AxiosRequestConfig
): Promise<AxiosResponse> =>
  Promise.resolve({
    data: route(config.method, config.url.replace(BASE_URL, '')),
    status: 200,
    statusText: 'OK',
    headers: {},
    config
  });

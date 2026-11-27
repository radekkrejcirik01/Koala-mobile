import { AxiosRequestConfig, AxiosResponse } from 'axios';
import moment from 'moment';
import { EmotionType } from '@enums/EmotionType';
import { EMOTIONS } from '@constants/EMOTIONS';
import { MessageType } from '@enums/MessageType';
import { ChatActivityType } from '@enums/ChatActivityType';
import { SUPPORT_REACTION } from '@constants/SUPPORT_REACTION';
import { API_URL } from '@utils/Axios/Axios.config';

// Fake backend for App Store screenshots, enable via MOCK_DATA in Axios.instance

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

// A mood one of you shared, the support for it and the talk that followed
interface Episode {
  // Who shared the mood, the other one supported it
  sharedBy: number;
  // Leaves the mood without support, showing the support button
  unsupported?: boolean;
  emotion: EmotionType;
  feeling: string;
  // When the last message of the episode was sent
  minutesAgo: number;
  messages: Message[];
}

interface Chat {
  id: number;
  friendId: number;
  seen: number;
  // Oldest first, the last one is the latest mood
  episodes: Episode[];
}

const DAY = 60 * 24;

const CHATS: Chat[] = [
  {
    id: 1,
    friendId: 3,
    seen: 0,
    episodes: [
      {
        sharedBy: 3,
        emotion: EmotionType.Good,
        feeling: 'Good',
        minutesAgo: DAY * 6,
        messages: [
          [1, 'Nice! What happened?'],
          [3, 'Finally a calm weekend, cooked and read all day'],
          [1, 'You needed that']
        ]
      },
      {
        sharedBy: 1,
        emotion: EmotionType.Meh,
        feeling: 'Meh',
        minutesAgo: DAY * 3,
        messages: [
          [3, 'Monday got you too?'],
          [1, 'Back to back meetings, no lunch'],
          [3, 'Same. Let us survive till Friday 😅']
        ]
      },
      {
        sharedBy: 3,
        emotion: EmotionType.Bad,
        feeling: 'Bad',
        minutesAgo: 4,
        messages: [
          [3, 'Could not sleep again, my brain was so loud at 3am'],
          [1, 'Ugh, the worst. The work stuff?'],
          [3, 'Yeah, they moved the deadline up', '😢'],
          [1, 'Want me to bring you coffee at lunch?'],
          [3, 'You are the best, yes please ☕️']
        ]
      }
    ]
  },
  {
    id: 2,
    friendId: 2,
    seen: 0,
    episodes: [
      {
        sharedBy: 2,
        emotion: EmotionType.Bad,
        feeling: 'Bad',
        minutesAgo: DAY * 4,
        messages: [
          [1, 'What is going on?'],
          [2, 'Car broke down on the highway'],
          [1, 'Are you ok?? Need a ride?'],
          [2, 'All sorted, just an expensive day 😮‍💨']
        ]
      },
      {
        sharedBy: 1,
        emotion: EmotionType.Meh,
        feeling: 'Meh',
        minutesAgo: 38,
        messages: [
          [2, 'Still the landlord thing?'],
          [1, 'Yeah, rent is going up again in March'],
          [2, 'Want to look at flats together this weekend?'],
          [1, 'Honestly that would help'],
          [2, 'Coffee on Saturday and we make a list ☕️']
        ]
      }
    ]
  },
  {
    id: 3,
    friendId: 5,
    seen: 1,
    episodes: [
      {
        sharedBy: 1,
        emotion: EmotionType.Good,
        feeling: 'Good',
        minutesAgo: DAY * 2,
        messages: [
          [5, 'How did the interview go?'],
          [1, 'Better than I thought, fingers crossed 🤞']
        ]
      },
      {
        sharedBy: 5,
        emotion: EmotionType.ReallyBad,
        feeling: 'Awful',
        minutesAgo: 95,
        messages: [
          [5, 'Thank you for checking in'],
          [5, 'Mum is in the hospital again'],
          [1, 'I am so sorry. Want some company tonight?'],
          [5, 'Yes please, that would help a lot', '❤️']
        ]
      }
    ]
  },
  {
    id: 4,
    friendId: 9,
    seen: 0,
    episodes: [
      {
        sharedBy: 9,
        emotion: EmotionType.Good,
        feeling: 'Good',
        minutesAgo: DAY * 5,
        messages: [
          [1, 'Congrats on the new job!! 🎉'],
          [9, 'Thank you! Nervous but excited']
        ]
      },
      {
        sharedBy: 9,
        unsupported: true,
        emotion: EmotionType.Bad,
        feeling: 'Bad',
        minutesAgo: 180,
        messages: [
          [9, 'First week at the new job and I feel so lost'],
          [9, 'Everyone seems to know what they are doing'],
          [9, 'Is it normal to feel this way?']
        ]
      }
    ]
  },
  {
    id: 5,
    friendId: 4,
    seen: 1,
    episodes: [
      {
        sharedBy: 1,
        emotion: EmotionType.Bad,
        feeling: 'Bad',
        minutesAgo: DAY * 7,
        messages: [
          [4, 'Rough one?'],
          [1, 'Missed my train, then spilled coffee on my laptop'],
          [4, 'Peak Monday 😂 hope the laptop survived']
        ]
      },
      {
        sharedBy: 4,
        emotion: EmotionType.Meh,
        feeling: 'Meh',
        minutesAgo: DAY + 120,
        messages: [
          [1, 'Hey, everything ok?'],
          [4, 'Just tired, exam week 😮‍💨'],
          [1, 'You have got this. Dinner on me after?'],
          [4, 'Thanks for checking on me, means a lot 💛']
        ]
      }
    ]
  },
  {
    id: 6,
    friendId: 7,
    seen: 1,
    episodes: [
      {
        sharedBy: 7,
        emotion: EmotionType.Bad,
        feeling: 'Bad',
        minutesAgo: DAY * 4,
        messages: [
          [1, 'Here for you, want to talk?'],
          [7, 'Just feeling stuck lately'],
          [1, 'Call tonight?'],
          [7, 'Yes please 💛']
        ]
      },
      {
        sharedBy: 7,
        emotion: EmotionType.Good,
        feeling: 'Good',
        minutesAgo: DAY + 360,
        messages: [
          [7, 'Went to my first therapy session today'],
          [1, 'That takes courage. How do you feel?'],
          [7, 'Lighter, honestly'],
          [1, 'Proud of you, seriously']
        ]
      }
    ]
  },
  {
    id: 7,
    friendId: 6,
    seen: 1,
    episodes: [
      {
        sharedBy: 6,
        emotion: EmotionType.Meh,
        feeling: 'Meh',
        minutesAgo: DAY * 2 + 240,
        messages: [
          [6, 'The baby was up all night with a fever'],
          [1, 'Oh no. Want me to drop off dinner?'],
          [6, 'You are a lifesaver 🙏']
        ]
      }
    ]
  },
  {
    id: 8,
    friendId: 8,
    seen: 1,
    episodes: [
      {
        sharedBy: 1,
        emotion: EmotionType.ReallyBad,
        feeling: 'Awful',
        minutesAgo: DAY * 6,
        messages: [
          [8, 'Want to talk about it?'],
          [1, 'One of those weeks where everything goes wrong'],
          [8, 'Call me after work, I mean it']
        ]
      },
      {
        sharedBy: 1,
        emotion: EmotionType.Good,
        feeling: 'Good',
        minutesAgo: DAY * 3 + 180,
        messages: [
          [8, 'Glad the week ended better than it started'],
          [1, 'Me too. See you on Saturday!']
        ]
      }
    ]
  }
];

// Oldest first, the endpoint reverses it
const getMessages = (chat: Chat) =>
  chat.episodes.flatMap((episode: Episode, episodeIndex: number) => {
    const start = episode.minutesAgo + episode.messages.length + 2;
    const emotionId = chat.id * 1000 + episodeIndex * 100;

    return [
      {
        id: emotionId,
        type: MessageType.Emotion,
        senderId: episode.sharedBy,
        emotion: episode.emotion,
        message: episode.feeling,
        reaction: episode.unsupported ? undefined : SUPPORT_REACTION,
        time: ago(start)
      },
      ...episode.messages.map(
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
  });

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
  EmotionType.Bad,
  EmotionType.Good,
  EmotionType.Meh,
  EmotionType.SuperGood,
  EmotionType.ReallyBad,
  EmotionType.Good,
  EmotionType.Meh,
  EmotionType.Bad,
  EmotionType.SuperGood,
  EmotionType.Good,
  EmotionType.Meh,
  EmotionType.Bad,
  EmotionType.Good,
  EmotionType.ReallyBad,
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
          // Every few emotions come with a note
          note:
            index % 4 === 0 ? 'Long day at work, but it ended well' : undefined,
          time,
          recipients: FRIENDS.filter(
            (_, friendIndex) => (seed + i + friendIndex) % 3 === 0
          )
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
    if (!chat || params.lastId) {
      return success();
    }

    // An unread chat was last read before its newest message
    const messages = getMessages(chat);
    return success({
      data: messages.slice().reverse(),
      lastReadId: chat.seen ? undefined : messages[messages.length - 2]?.id
    });
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
    data: route(config.method, config.url.replace(API_URL, '')),
    status: 200,
    statusText: 'OK',
    headers: {},
    config
  });

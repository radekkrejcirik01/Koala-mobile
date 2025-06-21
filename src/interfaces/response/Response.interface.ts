import {
  ConversationInterface,
  EmotionInterface,
  FriendStatusInterface,
  HistoryInterface,
  InviteInterface,
  NotificationInterface,
  UserInterface
} from '@interfaces/general.interface';
import { ReplyInterface } from '@components/chat/Replies/Replies.props';
import { QuestionInterface } from '@screens/account/CheckOnScreen/CheckOnScreen.const';

export interface ResponseInterface {
  status: string;
  message: string;
}

export interface AuthResponseInterface {
  status: string;
  message: string;
  token: string;
}

export interface ResponseUserGetInterface {
  status: string;
  message: string;
  data?: UserInterface;
}

export interface ResponseLastOnlineGetInterface {
  status: string;
  message: string;
  time?: number;
}

export interface ResponseFriendsGetInterface {
  status: string;
  message: string;
  data?: UserInterface[];
}

export interface ResponseInvitesGetInterface {
  status: string;
  message: string;
  data?: InviteInterface[];
}

export interface ResponseNotificationsGetInterface {
  status: string;
  message: string;
  data?: NotificationInterface[];
}

export interface ResponseConversationGetInterface {
  status: string;
  message: string;
  data?: ConversationInterface[];
}

export interface ResponseHistoryGetInterface {
  status: string;
  message: string;
  data?: HistoryInterface[];
}

export interface ResponseUnseenNotificationsGetInterface {
  status: string;
  message: string;
  unseenNotifications?: number;
}

export interface ResponseEmotionsGetInterface {
  status: string;
  message: string;
  data: EmotionInterface[];
  removed?: number[];
}

export interface ResponseExpressionsGetInterface {
  status: string;
  message: string;
  expression: string;
  data: FriendStatusInterface[];
}

export interface ResponseRepliesGetInterface {
  status: string;
  message: string;
  data: ReplyInterface[];
}

export interface ResponseCheckOnMessagesGetInterface {
  status: string;
  message: string;
  data: QuestionInterface[];
}

export interface ResponseLastSharedMessageGetInterface {
  status: string;
  message: string;
  data: EmotionInterface;
}

export interface ResponseProfilePhotoPostInterface {
  status: string;
  message: string;
  data: string;
}

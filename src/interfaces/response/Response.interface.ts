import {
  ChatInterface,
  InviteInterface,
  MessageInterface,
  SharedEmotionInterface,
  UserInterface
} from '@interfaces/general.interface';

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

export interface ResponseChatsGetInterface {
  status: string;
  message: string;
  data?: ChatInterface[];
}

export interface ResponseMessagesGetInterface {
  status: string;
  message: string;
  data?: MessageInterface[];
}

export interface ResponseMessagePostInterface {
  status: string;
  message: string;
  data?: MessageInterface;
}

export interface ResponseUnreadChatsGetInterface {
  status: string;
  message: string;
  unreadChats?: number;
}

export interface ResponseProfilePhotoPostInterface {
  status: string;
  message: string;
  data: string;
}

export interface ResponseEmotionsGetInterface {
  status: string;
  message: string;
  data?: SharedEmotionInterface[];
}

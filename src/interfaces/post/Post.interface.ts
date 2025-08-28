import { EmotionScreenMessageType } from '@enums/EmotionScreenMessageType';

export interface UserPostInterface {
  name: string;
  username: string;
  password: string;
}

export interface LoginPostInterface {
  username: string;
  password: string;
}

export interface UsernamePostInterface {
  username: string;
}

export interface ChangeNamePostInterface {
  name: string;
}

export interface ChangePasswordPostInterface {
  oldPassword: string;
  newPassword: string;
}

export interface InvitePostInterface {
  receiver: string;
}

export interface DevicePostInterface {
  deviceToken: string;
  userId: number;
  platform: string;
}

export interface EmotionPostInterface {
  message: string;
  tip1?: string;
  tip2?: string;
  type: EmotionScreenMessageType;
}

export interface EmotionMessagePostInterface {
  ids: number[];
  message: string;
}

export interface MessagePostInterface {
  conversationId: number;
  receiverId: number;
  message: string;
  replyMessage?: string;
  audioBuffer?: string;
}

export interface PasswordResetPostInterface {
  username: string;
  email: string;
  friendUsername: string;
}

export interface ReplyPostInterface {
  message: string;
}

export interface SupportPostInterface {
  message: string;
  email: string;
}

export interface FeedbackPostInterface {
  message: string;
}

export interface ProfilePhotoPostInterface {
  buffer: string;
  fileName: string;
}

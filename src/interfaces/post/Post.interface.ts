import { EmotionType } from '@enums/EmotionType';

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

export interface EmailPostInterface {
  email: string;
}

export interface EmailVerifyPostInterface {
  // A string, so leading zeros are kept
  code: string;
}

export interface PasswordResetRequestPostInterface {
  username: string;
}

export interface PasswordResetConfirmPostInterface {
  username: string;
  code: string;
  newPassword: string;
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
  platform: string;
  version: string;
}

export interface EmotionMessagePostInterface {
  ids: number[];
  message: string;
  emotion: EmotionType;
}

export interface MessagePostInterface {
  message: string;
  // Quotes this message
  replyToId?: number;
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

export interface ReactionPostInterface {
  // Null removes the reaction
  reaction: string | null;
}

// A missing field stays as it is, null removes it
export interface ChatSettingsPostInterface {
  nickname?: string | null;
  theme?: string | null;
}

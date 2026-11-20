import { Images } from '@enums/images';

export interface ReducerProps {
  user: User;
  newAccount: NewAccount;
  notifications: Notifications;
  live: Live;
}

export interface User {
  token: string;
  // Just signed up and hasn't confirmed an email yet, the required last step.
  // Not persisted, closing the app skips it and the email can be added later
  // from Account
  emailRequired: boolean;
  user: {
    id: number;
    name: string;
    username: string;
    profilePhoto: string;
    // Left out until an email is confirmed
    email?: string;
  };
  image: Images;
}

export interface NewAccount {
  name: string;
  username: string;
}

export interface Notifications {
  unreadChats: number;
  unseenInvites: number;
}

export interface Live {
  // Friends typing to the user right now
  typingIds: number[];
}

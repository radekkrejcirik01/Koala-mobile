import { Images } from '@enums/images';

export interface ReducerProps {
  user: User;
  newAccount: NewAccount;
  notifications: Notifications;
}

export interface User {
  token: string;
  user: {
    id: number;
    name: string;
    username: string;
    profilePhoto: string;
  };
  image: Images;
}

export interface NewAccount {
  name: string;
  username: string;
}

export interface Notifications {
  unseenNotifications: number;
}

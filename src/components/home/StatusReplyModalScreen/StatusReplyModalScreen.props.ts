import { FriendStatusInterface } from '@interfaces/general.interface';

export interface StatusReplyModalScreenProps {
  item: FriendStatusInterface;
  onPressReply: (message: string) => void;
}

export interface ChatHeaderProps {
  chatUserId: number;
  username: string;
  name: string;
  profilePhoto?: string;
  // Opens the chat settings, not set until the friend is loaded
  onPress?: () => void;
}

export const ChatHeaderDefaultProps: Omit<
  ChatHeaderProps,
  'chatUserId' | 'username' | 'name'
> = {
  profilePhoto: null,
  onPress: undefined
};

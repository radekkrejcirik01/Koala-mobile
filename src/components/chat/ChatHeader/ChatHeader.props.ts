export interface ChatHeaderProps {
    chatUserId: number;
    username: string;
    name: string;
    profilePhoto?: string;
}

export const ChatHeaderDefaultProps: Omit<
    ChatHeaderProps,
    'chatUserId' | 'username' | 'name'
> = {
    profilePhoto: null
};

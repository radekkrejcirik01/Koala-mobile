export interface ProfileItemProps {
    onPress: () => void;
    title: string;
    isLast?: boolean;
}

export const ProfileItemDefaultProps: Omit<
    ProfileItemProps,
    'onPress' | 'title'
> = {
    isLast: false
};

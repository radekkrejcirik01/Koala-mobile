import { StyleProp, ViewStyle } from 'react-native';

export interface FriendItemProps {
    name: string;
    onPress: () => void;
    onLongPress?: () => void;
    size: number;
    style?: StyleProp<ViewStyle>;
}

export const FriendItemDefaultProps: Omit<
    FriendItemProps,
    'name' | 'onPress' | 'size'
> = {
    onLongPress: null,
    style: {}
};

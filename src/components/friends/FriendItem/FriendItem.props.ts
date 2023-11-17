import { StyleProp, ViewStyle } from 'react-native';

export interface FriendItemProps {
    name: string;
    onPress: () => void;
    onLongPress?: () => void;
    style?: StyleProp<ViewStyle>;
}

export const FriendItemDefaultProps: Omit<FriendItemProps, 'name' | 'onPress'> =
    {
        onLongPress: null,
        style: {}
    };

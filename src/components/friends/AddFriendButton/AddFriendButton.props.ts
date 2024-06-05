import { StyleProp, ViewStyle } from 'react-native';

export interface AddFriendButtonProps {
    size: number;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

export const AddFriendButtonDefaultProps: Omit<
    AddFriendButtonProps,
    'size' | 'onPress'
> = {
    style: {}
};

import { StyleProp, ViewStyle } from 'react-native';

export interface SendProps {
    onFriendSelect: (id: number) => void;
    onAddFriendPress: () => void;
    onPressSend: () => void;
    sending: boolean;
    sent: boolean;
    style: StyleProp<ViewStyle>;
}

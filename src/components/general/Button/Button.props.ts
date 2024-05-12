import { StyleProp, ViewStyle } from 'react-native';

export interface ButtonProps {
    title: string;
    onPress: () => void;
    posting?: boolean;
    style?: StyleProp<ViewStyle>;
}

export const ButtonDefaultProps: Omit<ButtonProps, 'title' | 'onPress'> = {
    posting: false,
    style: {}
};

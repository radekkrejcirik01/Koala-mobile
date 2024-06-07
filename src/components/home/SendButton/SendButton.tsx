import React, { JSX } from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import COLORS from '@constants/COLORS';
import { SendButtonStyle } from '@components/home/SendButton/SendButton.style';
import { SendButtonProps } from '@components/home/SendButton/SendButton.props';

export const SendButton = ({
    onPress,
    sending,
    sent
}: SendButtonProps): JSX.Element => (
    <TouchableOpacity
        activeOpacity={0.9}
        disabled={sent}
        onPress={onPress}
        style={SendButtonStyle.view}
    >
        {sending ? (
            <ActivityIndicator color={COLORS.WHITE} />
        ) : (
            <Text style={SendButtonStyle.text}>{sent ? 'Sent' : 'Send'}</Text>
        )}
    </TouchableOpacity>
);

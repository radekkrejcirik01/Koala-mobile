import React, { JSX } from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import COLORS from '@constants/COLORS';
import { ShareButtonStyle } from '@components/home/ShareButton/ShareButton.style';
import { ShareButtonProps } from '@components/home/ShareButton/ShareButton.props';

export const ShareButton = ({
    onPress,
    sending,
    sent
}: ShareButtonProps): JSX.Element => (
    <TouchableOpacity
        activeOpacity={0.9}
        disabled={sent}
        onPress={onPress}
        style={ShareButtonStyle.view}
    >
        {sending ? (
            <ActivityIndicator color={COLORS.WHITE} />
        ) : (
            <Text style={ShareButtonStyle.text}>
                {sent ? 'Received' : 'Share'}
            </Text>
        )}
    </TouchableOpacity>
);

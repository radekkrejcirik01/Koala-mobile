import React, { JSX } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Badge } from '@components/general/Badge/Badge';
import { ReducerProps } from '@store/index/index.props';
import { MessagesButtonStyle } from '@components/home/MessagesButton/MessagesButton.style';
import { MessagesButtonProps } from '@components/home/MessagesButton/MessagesButton.props';

export const MessagesButton = ({
    onPress
}: MessagesButtonProps): JSX.Element => {
    const { unseenNotifications } = useSelector(
        (state: ReducerProps) => state.notifications
    );

    return (
        <TouchableOpacity activeOpacity={0.9} hitSlop={10} onPress={onPress}>
            <Text style={MessagesButtonStyle.text}>💬</Text>
            <Badge value={unseenNotifications} />
        </TouchableOpacity>
    );
};

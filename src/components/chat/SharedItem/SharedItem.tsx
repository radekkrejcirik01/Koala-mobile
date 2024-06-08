import React, { JSX } from 'react';
import { Text, View } from 'react-native';
import { getMessageTime } from '@functions/getMessageTime';
import { SharedItemStyle } from '@components/chat/SharedItem/SharedItem.style';
import { SharedItemProps } from '@components/chat/SharedItem/SharedItem.props';

export const SharedItem = ({ item }: SharedItemProps): JSX.Element => (
    <View style={SharedItemStyle.container}>
        <Text style={SharedItemStyle.messageText}>{item.message}</Text>
        <Text style={SharedItemStyle.timeText}>
            {getMessageTime(item?.time)}
        </Text>
    </View>
);

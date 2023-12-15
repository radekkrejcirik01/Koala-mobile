import React, { JSX } from 'react';
import { Text, View } from 'react-native';
import { getLocalTimeFromUTCUnix } from '@functions/getLocalTimeFromUTCUnix';
import { SharedItemStyle } from '@components/respond/SharedItem/SharedItem.style';
import { SharedItemProps } from '@components/respond/SharedItem/SharedItem.props';

export const SharedItem = ({ item }: SharedItemProps): JSX.Element => (
    <View style={SharedItemStyle.container}>
        <Text style={SharedItemStyle.messageText}>{item.message}</Text>
        <Text style={SharedItemStyle.timeText}>
            {getLocalTimeFromUTCUnix(item?.time)}
        </Text>
    </View>
);

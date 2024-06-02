import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NotificationsHeaderStyle } from '@components/notifications/NotificationsHeader/NotificationsHeader.style';
import { NotificationsHeaderProps } from '@components/notifications/NotificationsHeader/NotificationsHeader.props';

export const NotificationsHeader = ({
    onPlusPress
}: NotificationsHeaderProps): JSX.Element => (
    <View style={NotificationsHeaderStyle.container}>
        <Text style={NotificationsHeaderStyle.titleText}>
            DMs <Text style={NotificationsHeaderStyle.emojiText}>💬</Text>
        </Text>
        <TouchableOpacity
            activeOpacity={0.7}
            hitSlop={20}
            onPress={onPlusPress}
        >
            <Text style={NotificationsHeaderStyle.addFriendsText}>Add +</Text>
        </TouchableOpacity>
    </View>
);

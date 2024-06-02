import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NotificationsHeaderStyle } from '@components/notifications/NotificationsHeader/NotificationsHeader.style';
import { NotificationsHeaderProps } from '@components/notifications/NotificationsHeader/NotificationsHeader.props';
import { BackButton } from '@components/general/BackButton/BackButton';

export const NotificationsHeader = ({
    onPlusPress
}: NotificationsHeaderProps): JSX.Element => (
    <View style={NotificationsHeaderStyle.container}>
        <View style={NotificationsHeaderStyle.centerView}>
            <BackButton />
            <Text style={NotificationsHeaderStyle.titleText}>Messages</Text>
        </View>
        <TouchableOpacity
            activeOpacity={0.7}
            hitSlop={20}
            onPress={onPlusPress}
        >
            <Text style={NotificationsHeaderStyle.addFriendsText}>
                Add friends
            </Text>
        </TouchableOpacity>
    </View>
);

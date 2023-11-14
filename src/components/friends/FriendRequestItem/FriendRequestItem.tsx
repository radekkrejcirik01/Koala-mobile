import React, { JSX } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { FriendRequestItemProps } from '@components/friends/FriendRequestItem/FriendRequestItem.props';
import COLORS from '@constants/COLORS';
import { FriendRequestItemStyle } from '@components/friends/FriendRequestItem/FriendRequestItem.style';

export const FriendRequestItem = ({
    item,
    posting,
    onAcceptInvite
}: FriendRequestItemProps): JSX.Element => (
    <View style={FriendRequestItemStyle.container}>
        <View style={FriendRequestItemStyle.content}>
            <ProfilePhoto name={item.username} size={40} />
            <Text style={FriendRequestItemStyle.usernameText}>
                {item.username}
            </Text>
        </View>
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onAcceptInvite}
            style={FriendRequestItemStyle.acceptButtonView}
        >
            {posting ? (
                <ActivityIndicator color={COLORS.WHITE} size="small" />
            ) : (
                <Text style={FriendRequestItemStyle.acceptButtonText}>
                    Accept
                </Text>
            )}
        </TouchableOpacity>
    </View>
);

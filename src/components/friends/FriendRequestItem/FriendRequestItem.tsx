import React, { JSX } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { FriendRequestItemProps } from '@components/friends/FriendRequestItem/FriendRequestItem.props';
import COLORS from '@constants/COLORS';
import { FriendRequestItemStyle } from '@components/friends/FriendRequestItem/FriendRequestItem.style';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';

export const FriendRequestItem = ({
    item,
    posting,
    onAcceptInvite,
    onRemove
}: FriendRequestItemProps): JSX.Element => (
    <View style={FriendRequestItemStyle.container}>
        <View style={FriendRequestItemStyle.content}>
            <ProfilePhoto name={item.username} size={40} />
            <Text style={FriendRequestItemStyle.usernameText}>
                {item.username}
            </Text>
        </View>
        <View style={FriendRequestItemStyle.buttonsContainer}>
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
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={onRemove}
                style={FriendRequestItemStyle.removeButtonView}
            >
                <Icon name={IconEnum.CLEAN} size={22} />
            </TouchableOpacity>
        </View>
    </View>
);

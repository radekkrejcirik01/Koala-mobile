import React, { JSX } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { FriendItemProps } from '@components/friends/FriendItem/FriendItem.props';
import { FriendItemStyle } from '@components/friends/FriendItem/FriendItem.style';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';

export const FriendItem = ({
    name,
    onAddPress,
    onPress,
    onLongPress
}: FriendItemProps): JSX.Element =>
    name ? (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            onLongPress={onLongPress}
            delayLongPress={150}
            style={FriendItemStyle.container}
        >
            <ProfilePhoto name={name} size={65} />
            <Text style={FriendItemStyle.nameText}>{name}</Text>
        </TouchableOpacity>
    ) : (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onAddPress}
            style={FriendItemStyle.addView}
        >
            <Icon name={IconEnum.PLUS} size={14} />
        </TouchableOpacity>
    );

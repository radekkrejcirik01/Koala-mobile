import React, { JSX } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { FriendItemProps } from '@components/friends/FriendItem/FriendItem.props';
import { FriendItemStyle } from '@components/friends/FriendItem/FriendItem.style';

export const FriendItem = ({
    name,
    onPress,
    onLongPress
}: FriendItemProps): JSX.Element => (
    <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        onLongPress={onLongPress}
        delayLongPress={150}
        style={FriendItemStyle.container}
    >
        <ProfilePhoto name={name} size={60} />
        <Text style={FriendItemStyle.nameText}>{name}</Text>
    </TouchableOpacity>
);

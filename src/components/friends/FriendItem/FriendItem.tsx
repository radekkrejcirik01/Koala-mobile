import React, { JSX } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import {
    FriendItemDefaultProps,
    FriendItemProps
} from '@components/friends/FriendItem/FriendItem.props';
import { FriendItemStyle } from '@components/friends/FriendItem/FriendItem.style';

export const FriendItem = ({
    name,
    profilePhoto,
    onPress,
    onLongPress,
    size,
    style
}: FriendItemProps): JSX.Element => (
    <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        onLongPress={onLongPress}
        delayLongPress={150}
        style={[FriendItemStyle.container, style]}
    >
        <ProfilePhoto name={name} photo={profilePhoto} size={size} />
        <Text adjustsFontSizeToFit style={FriendItemStyle.nameText}>
            {name}
        </Text>
    </TouchableOpacity>
);

FriendItem.defaultProps = FriendItemDefaultProps;

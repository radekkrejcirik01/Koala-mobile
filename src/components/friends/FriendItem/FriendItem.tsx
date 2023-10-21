import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { FriendItemProps } from '@components/friends/FriendItem/FriendItem.props';
import { FriendItemStyle } from '@components/friends/FriendItem/FriendItem.style';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';

export const FriendItem = ({
    name,
    onAddPress
}: FriendItemProps): JSX.Element =>
    name ? (
        <View style={FriendItemStyle.container}>
            <ProfilePhoto name={name} size={65} />
            <Text style={FriendItemStyle.nameText}>{name}</Text>
        </View>
    ) : (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onAddPress}
            style={FriendItemStyle.addView}
        >
            <Icon name={IconEnum.PLUS} size={14} />
        </TouchableOpacity>
    );

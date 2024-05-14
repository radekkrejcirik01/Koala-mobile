import React, { JSX } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { AddFriendsDescriptionButtonStyle } from '@components/home/AddFriendsDescriptionButton/AddFriendsDescriptionButton.style';
import { AddFriendsDescriptionButtonProps } from '@components/home/AddFriendsDescriptionButton/AddFriendsDescriptionButton.props';

export const AddFriendsDescriptionButton = ({
    onPress
}: AddFriendsDescriptionButtonProps): JSX.Element => (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
        <Text
            adjustsFontSizeToFit
            style={AddFriendsDescriptionButtonStyle.view}
        >
            Add friends to share
        </Text>
    </TouchableOpacity>
);

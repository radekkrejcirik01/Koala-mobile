import React, { JSX } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { AddFriendButtonStyle } from '@components/home/AddFriendButton/AddFriendButton.style';
import {
    AddFriendButtonDefaultProps,
    AddFriendButtonProps
} from '@components/home/AddFriendButton/AddFriendButton.props';

export const AddFriendButton = ({
    size,
    onPress,
    style
}: AddFriendButtonProps): JSX.Element => (
    <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={[
            AddFriendButtonStyle.view,
            { height: size, width: size },
            style
        ]}
    >
        <Icon name={IconEnum.PLUS} size={12} />
    </TouchableOpacity>
);

AddFriendButton.defaultProps = AddFriendButtonDefaultProps;

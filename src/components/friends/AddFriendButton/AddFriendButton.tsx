import React, { JSX } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { AddFriendButtonStyle } from '@components/friends/AddFriendButton/AddFriendButton.style';
import {
  AddFriendButtonDefaultProps,
  AddFriendButtonProps
} from '@components/friends/AddFriendButton/AddFriendButton.props';
import COLORS from '@constants/COLORS';
import { useTheme } from '@contexts/ThemeContext';

export const AddFriendButton = ({
  size,
  onPress,
  style
}: AddFriendButtonProps): JSX.Element => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        AddFriendButtonStyle.view,
        {
          height: size,
          width: size,
          borderColor: theme.isDark ? COLORS.GRAY_200 : COLORS.LIGHTGRAY
        },
        style
      ]}
    >
      <Icon name={IconEnum.PLUS} size={12} />
    </TouchableOpacity>
  );
};

AddFriendButton.defaultProps = AddFriendButtonDefaultProps;

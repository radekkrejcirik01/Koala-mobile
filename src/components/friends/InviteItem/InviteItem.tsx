import React, { JSX } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { InviteItemProps } from '@components/friends/InviteItem/InviteItem.props';
import COLORS from '@constants/COLORS';
import { InviteItemStyle } from '@components/friends/InviteItem/InviteItem.style';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { useTheme } from '../../../ThemeContext';

export const InviteItem = ({
  item,
  posting,
  onAcceptInvite,
  onRemove
}: InviteItemProps): JSX.Element => {
  const theme = useTheme();
  return (
    <View style={InviteItemStyle.container}>
      <View style={InviteItemStyle.content}>
        <ProfilePhoto
          name={item.username}
          photo={item?.profilePhoto}
          size={40}
        />
        <Text
          style={[
            InviteItemStyle.usernameText,
            { color: theme.theme.colors.text }
          ]}
        >
          {item.username}
        </Text>
      </View>
      <View style={InviteItemStyle.buttonsContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onAcceptInvite}
          style={InviteItemStyle.acceptButtonView}
        >
          {posting ? (
            <ActivityIndicator color={COLORS.WHITE} size="small" />
          ) : (
            <Text style={InviteItemStyle.acceptButtonText}>Accept</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onRemove}
          style={InviteItemStyle.removeButtonView}
        >
          <Icon name={IconEnum.CLEAN} size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

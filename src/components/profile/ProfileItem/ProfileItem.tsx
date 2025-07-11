import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import {
  ProfileItemDefaultProps,
  ProfileItemProps
} from '@components/profile/ProfileItem/ProfileItem.props';
import { ProfileItemStyle } from '@components/profile/ProfileItem/ProfileItem.style';

export const ProfileItem = ({
  onPress,
  icon,
  title,
  isLast
}: ProfileItemProps): JSX.Element => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    style={[ProfileItemStyle.view, isLast && ProfileItemStyle.noBorder]}
  >
    <View style={ProfileItemStyle.row}>
      <Text style={ProfileItemStyle.icon}>{icon}</Text>
      <Text style={ProfileItemStyle.title}>{title}</Text>
    </View>
    <Icon
      name={IconEnum.BACK}
      size={16}
      style={{ transform: [{ rotate: '180deg' }] }}
    />
  </TouchableOpacity>
);

ProfileItem.defaultProps = ProfileItemDefaultProps;

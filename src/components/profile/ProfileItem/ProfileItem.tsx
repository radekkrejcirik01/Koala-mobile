import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { ProfileItemProps } from '@components/profile/ProfileItem/ProfileItem.props';
import { ProfileItemStyle } from '@components/profile/ProfileItem/ProfileItem.style';
import { useTheme } from '@contexts/ThemeContext';

export const ProfileItem = ({
  onPress,
  icon,
  title
}: ProfileItemProps): JSX.Element => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={ProfileItemStyle.view}
    >
      <View style={ProfileItemStyle.row}>
        <Text style={ProfileItemStyle.icon}>{icon}</Text>
        <Text
          style={[ProfileItemStyle.title, { color: theme.theme.colors.text }]}
        >
          {title}
        </Text>
      </View>
      <Icon
        name={IconEnum.BACK}
        size={16}
        style={{ transform: [{ rotate: '180deg' }] }}
      />
    </TouchableOpacity>
  );
};

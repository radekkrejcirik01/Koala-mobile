import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import COLORS from '@constants/COLORS';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { ProfileItemProps } from '@components/profile/ProfileItem/ProfileItem.props';
import { useProfileItemStyle } from '@components/profile/ProfileItem/ProfileItem.style';

export const ProfileItem = ({
  onPress,
  icon,
  iconBackgroundColor,
  title,
  value,
  destructive = false,
  showChevron = true,
  isLast = false
}: ProfileItemProps): JSX.Element => {
  const ProfileItemStyle = useProfileItemStyle();
  const theme = useTheme();
  // White on dark, the red disappears on the brown card
  const destructiveColor = theme.isDark
    ? COLORS.WHITE
    : COLORS.NOTIFICATION_DOT;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={ProfileItemStyle.view}
    >
      {!!icon && (
        <View
          style={[
            ProfileItemStyle.iconView,
            !!iconBackgroundColor && { backgroundColor: iconBackgroundColor }
          ]}
        >
          <Text style={ProfileItemStyle.icon}>{icon}</Text>
        </View>
      )}
      <View
        style={[
          ProfileItemStyle.content,
          !icon && { marginLeft: 0 },
          isLast && ProfileItemStyle.noBorder
        ]}
      >
        <Text
          style={[
            ProfileItemStyle.title,
            {
              color: destructive ? destructiveColor : theme.theme.colors.text
            }
          ]}
        >
          {title}
        </Text>
        {!!value && (
          <Text numberOfLines={1} style={ProfileItemStyle.value}>
            {value}
          </Text>
        )}
        {showChevron && (
          <Icon
            name={IconEnum.BACK}
            size={14}
            // The grey arrow looks muddy on the brown background
            color={theme.isDark ? COLORS.WHITE : undefined}
            style={ProfileItemStyle.chevron}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

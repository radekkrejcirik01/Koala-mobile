import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import COLORS from '@constants/COLORS';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { ProfileItemProps } from '@components/profile/ProfileItem/ProfileItem.props';
import { ProfileItemStyle } from '@components/profile/ProfileItem/ProfileItem.style';

export const ProfileItem = ({
  onPress,
  icon,
  iconBackgroundColor,
  title,
  destructive = false,
  showChevron = true,
  isLast = false
}: ProfileItemProps): JSX.Element => {
  const theme = useTheme();
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
              color: destructive
                ? COLORS.NOTIFICATION_DOT
                : theme.theme.colors.text
            }
          ]}
        >
          {title}
        </Text>
        {showChevron && (
          <Icon
            name={IconEnum.BACK}
            size={14}
            style={ProfileItemStyle.chevron}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

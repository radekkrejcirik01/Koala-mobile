import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LastlySharedCardProps } from '@components/home/LastlySharedCard/LastlySharedCard.props';
import { LastlySharedCardStyle } from '@components/home/LastlySharedCard/LastlySharedCard.style';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { useTheme } from '@contexts/ThemeContext';

export const LastlySharedCard = ({
  onPress,
  title
}: LastlySharedCardProps): JSX.Element => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        LastlySharedCardStyle.view,
        { backgroundColor: theme.theme.colors.surface }
      ]}
    >
      <Text
        style={[
          LastlySharedCardStyle.title,
          { color: theme.theme.colors.text }
        ]}
      >
        {title}
      </Text>
      <View
        style={[
          LastlySharedCardStyle.button,
          { backgroundColor: theme.theme.colors.background }
        ]}
      >
        <Icon name={IconEnum.DIRECT} size={20} />
      </View>
    </TouchableOpacity>
  );
};

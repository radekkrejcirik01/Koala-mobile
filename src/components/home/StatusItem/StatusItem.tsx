import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StatusItemStyle } from '@components/home/StatusItem/StatusItem.style';
import { StatusItemProps } from '@components/home/StatusItem/StatusItem.props';
import { useTheme } from '@contexts/ThemeContext';

export const StatusItem = ({
  onPress,
  name,
  expression
}: StatusItemProps): JSX.Element => {
  const theme = useTheme();

  return (
    <View style={StatusItemStyle.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        hitSlop={10}
        onPress={onPress}
        style={[
          StatusItemStyle.button,
          { backgroundColor: theme.theme.colors.surface_200 }
        ]}
      >
        <Text
          style={[
            StatusItemStyle.expressionText,
            !expression && StatusItemStyle.opacity
          ]}
        >
          {expression || '😴'}
        </Text>
      </TouchableOpacity>
      <Text
        style={[StatusItemStyle.nameText, { color: theme.theme.colors.text }]}
      >
        {name}
      </Text>
    </View>
  );
};

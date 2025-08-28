import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@contexts/ThemeContext';
import { MessagesModalScreenStyle } from '@components/home/MessagesModalScreen/MessagesModalScreen.style';

export const MessagesModalScreen = () => {
  const { theme } = useTheme();
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      style={[
        MessagesModalScreenStyle.container,
        {
          backgroundColor: theme.colors.surface,
          paddingBottom: bottom || 10
        }
      ]}
    >
      <Text>Messages</Text>
    </View>
  );
};

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { MessagesStartScreenStyle } from '@screens/account/MessagesStartScreen/MessagesStartScreen.style';

export const MessagesStartScreen = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[MessagesStartScreenStyle.container, { paddingTop: top }]}>
      <ScreenHeader title="New message" close />
      <Text style={MessagesStartScreenStyle.title}>
        {`Can't find the right words? Let us help you find them.`}
      </Text>

      <TouchableOpacity
        activeOpacity={0.7}
        style={MessagesStartScreenStyle.buttonView}
      >
        <Text style={MessagesStartScreenStyle.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

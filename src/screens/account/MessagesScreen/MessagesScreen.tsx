import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { MessagesScreenStyle } from '@screens/account/MessagesScreen/MessagesScreen.style';

export const MessagesScreen = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[MessagesScreenStyle.container, { paddingTop: top }]}>
      <ScreenHeader title="New message" close />
      <Text style={MessagesScreenStyle.title}>
        {`Can't find the right words? Let us help you find them.`}
      </Text>

      <TouchableOpacity
        activeOpacity={0.7}
        style={MessagesScreenStyle.buttonView}
      >
        <Text style={MessagesScreenStyle.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

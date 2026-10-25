import React from 'react';
import { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NoHeader } from '@navigation/RootNavigator/RootStackNavigator.options';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { ShareScreen } from '@screens/account/ShareScreen/ShareScreen';
import { ShareSendScreen } from '@screens/account/ShareSendScreen/ShareSendScreen';

const ShareStack = createNativeStackNavigator<ParamListBase>();

// Nested stack so the modal-presented Share flow can still push a normal
// left-right card transition from ShareScreen to ShareSendScreen.
export const ShareStackNavigator = (): React.JSX.Element => (
  <ShareStack.Navigator
    id="shareStack"
    initialRouteName={AccountStackNavigatorEnum.ShareScreen}
    screenOptions={NoHeader}
  >
    <ShareStack.Screen
      name={AccountStackNavigatorEnum.ShareScreen}
      component={ShareScreen}
    />
    <ShareStack.Screen
      name={AccountStackNavigatorEnum.ShareSendScreen}
      component={ShareSendScreen as unknown as React.ComponentType}
    />
  </ShareStack.Navigator>
);

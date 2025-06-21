import React, { JSX, useCallback, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { LoginStackNavigatorEnum } from '@navigation/StackNavigators/login/LoginStackNavigator.enum';
import { setNameAction } from '@store/NewAccountReducer';
import { SecondScreenStyle } from '@screens/login/SecondScreen/SecondScreen.style';
import { Button } from '@components/general/Button/Button';

export const SecondScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.LoginStack);

  const [name, setName] = useState<string>();

  const onPressNext = useCallback(() => {
    if (!name) {
      Alert.alert('Please enter name');
      return;
    }

    dispatch(setNameAction(name));

    navigateTo(LoginStackNavigatorEnum.ThirdScreen);
  }, [dispatch, name, navigateTo]);

  return (
    <View style={SecondScreenStyle.container}>
      <View>
        <Text style={SecondScreenStyle.title}>Your name</Text>
        <TextInput
          autoFocus
          autoCorrect={false}
          onChangeText={setName}
          style={SecondScreenStyle.input}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        keyboardVerticalOffset={15}
      >
        <Button title="Next" onPress={onPressNext} />
      </KeyboardAvoidingView>
    </View>
  );
};

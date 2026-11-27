import React, { JSX, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { LoginStackNavigatorEnum } from '@navigation/StackNavigators/login/LoginStackNavigator.enum';
import { setNameAction } from '@store/NewAccountReducer';
import { SecondScreenStyle } from '@screens/login/SecondScreen/SecondScreen.style';
import { Button } from '@components/general/Button/Button';
import { AuthLayout } from '@components/login/AuthLayout/AuthLayout';
import { AuthInput } from '@components/login/AuthInput/AuthInput';
import { removeSpaces } from '@functions/removeSpaces';

export const SecondScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.LoginStack);

  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>();

  const onChangeName = useCallback((value: string) => {
    setName(removeSpaces(value));
    setError(undefined);
  }, []);

  const onPressNext = useCallback(() => {
    if (!name) {
      trigger(HapticFeedbackTypes.notificationError);
      setError('Enter your name');
      return;
    }

    dispatch(setNameAction(name));

    navigateTo(LoginStackNavigatorEnum.ThirdScreen);
  }, [dispatch, name, navigateTo]);

  return (
    <AuthLayout
      title="What's your name?"
      step={1}
      totalSteps={4}
      footer={
        <Button
          title="Continue"
          onPress={onPressNext}
          style={SecondScreenStyle.button}
        />
      }
    >
      <AuthInput
        autoFocus
        placeholder="Your name"
        autoCapitalize="words"
        textContentType="givenName"
        autoComplete="name-given"
        returnKeyType="next"
        value={name}
        error={error}
        onChangeText={onChangeName}
        onSubmitEditing={onPressNext}
      />
    </AuthLayout>
  );
};

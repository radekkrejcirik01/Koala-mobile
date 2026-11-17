import React, { JSX, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { LoginStackNavigatorEnum } from '@navigation/StackNavigators/login/LoginStackNavigator.enum';
import { setNameAction } from '@store/NewAccountReducer';
import { SecondScreenStyle } from '@screens/login/SecondScreen/SecondScreen.style';
import { Button } from '@components/general/Button/Button';
import { AuthLayout } from '@components/login/AuthLayout/AuthLayout';
import { AuthInput } from '@components/login/AuthInput/AuthInput';

export const SecondScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.LoginStack);

  const [name, setName] = useState<string>('');

  const trimmedName = name.trim();

  const onPressNext = useCallback(() => {
    if (!trimmedName) {
      return;
    }

    dispatch(setNameAction(trimmedName));

    navigateTo(LoginStackNavigatorEnum.ThirdScreen);
  }, [dispatch, navigateTo, trimmedName]);

  return (
    <AuthLayout
      title="What's your name?"
      step={1}
      totalSteps={4}
      footer={
        <Button
          title="Continue"
          disabled={!trimmedName}
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
        onChangeText={setName}
        onSubmitEditing={onPressNext}
      />
    </AuthLayout>
  );
};

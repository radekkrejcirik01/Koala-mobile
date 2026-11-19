import React, { JSX, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { LoginStackNavigatorEnum } from '@navigation/StackNavigators/login/LoginStackNavigator.enum';
import { setUsernameAction } from '@store/NewAccountReducer';
import { ReducerProps } from '@store/index/index.props';
import { ThirdScreenStyle } from '@screens/login/ThirdScreen/ThirdScreen.style';
import { Button } from '@components/general/Button/Button';
import { AuthLayout } from '@components/login/AuthLayout/AuthLayout';
import { AuthInput } from '@components/login/AuthInput/AuthInput';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { UsernamePostInterface } from '@interfaces/post/Post.interface';

export const ThirdScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.LoginStack);

  const { name } = useSelector((state: ReducerProps) => state.newAccount);

  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState<string>();
  const [posting, setPosting] = useState<boolean>(false);

  const onChangeUsername = useCallback((value: string) => {
    // Usernames can't contain spaces
    setUsername(value.replace(/\s/g, ''));
    setError(undefined);
  }, []);

  const onPressNext = useCallback(() => {
    if (!username || posting) {
      return;
    }

    setPosting(true);

    postRequest<ResponseInterface, UsernamePostInterface>('username', {
      username
    }).subscribe((response: ResponseInterface) => {
      setPosting(false);

      if (!response?.status) {
        setError('Something went wrong. Please try again.');
        return;
      }

      if (response?.message?.includes('taken')) {
        trigger(HapticFeedbackTypes.notificationError);
        setError('This username is already taken');
        return;
      }

      dispatch(setUsernameAction(username));
      navigateTo(LoginStackNavigatorEnum.FourthScreen);
    });
  }, [dispatch, navigateTo, posting, username]);

  return (
    <AuthLayout
      title={name ? `Nice to meet you, ${name}` : 'Choose a username'}
      subtitle="Choose a username. Friends will use it to find and add you"
      step={2}
      totalSteps={4}
      footer={
        <Button
          title="Continue"
          disabled={!username}
          posting={posting}
          onPress={onPressNext}
          style={ThirdScreenStyle.button}
        />
      }
    >
      <AuthInput
        autoFocus
        placeholder="Username"
        autoCapitalize="none"
        textContentType="username"
        autoComplete="username-new"
        returnKeyType="next"
        value={username}
        error={error}
        onChangeText={onChangeUsername}
        onSubmitEditing={onPressNext}
      />
    </AuthLayout>
  );
};

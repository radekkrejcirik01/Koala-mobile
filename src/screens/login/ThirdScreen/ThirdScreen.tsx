import React, { useCallback, useState } from 'react';
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
import { setUsernameAction } from '@store/NewAccountReducer';
import { ThirdScreenStyle } from '@screens/login/ThirdScreen/ThirdScreen.style';
import { Button } from '@components/general/Button/Button';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { UsernamePostInterface } from '@interfaces/post/Post.interface';
import { useTheme } from '@contexts/ThemeContext';

export const ThirdScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.LoginStack);
  const theme = useTheme();

  const [username, setUsername] = useState<string>();

  const onPressNext = useCallback(() => {
    if (!username) {
      Alert.alert('Please enter username');
      return;
    }

    postRequest<ResponseInterface, UsernamePostInterface>('username', {
      username
    }).subscribe((response: ResponseInterface) => {
      if (response?.status) {
        if (response?.message?.includes('taken')) {
          Alert.alert('This username is already taken');
        } else {
          dispatch(setUsernameAction(username));
          navigateTo(LoginStackNavigatorEnum.FourthScreen);
        }
      }
    });
  }, [dispatch, navigateTo, username]);

  return (
    <View style={ThirdScreenStyle.container}>
      <View>
        <Text
          style={[ThirdScreenStyle.title, { color: theme.theme.colors.text }]}
        >
          Your username
        </Text>
        <TextInput
          autoFocus
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={setUsername}
          style={[
            ThirdScreenStyle.input,
            {
              backgroundColor: theme.theme.colors.surface,
              color: theme.theme.colors.text
            }
          ]}
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

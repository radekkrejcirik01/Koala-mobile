import React, { JSX, useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { ChangePasswordScreenStyle } from '@screens/account/ChangePasswordScreen/ChangePasswordScreen.style';
import COLORS from '@constants/COLORS';
import { putRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { ChangePasswordPostInterface } from '@interfaces/post/Post.interface';
import { useTheme } from '../../../ThemeContext';

export const ChangePasswordScreen = (): JSX.Element => {
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();

  const [oldPassword, setOldPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();

  const [posting, setPosting] = useState<boolean>(false);

  const changePassword = useCallback(() => {
    if (!oldPassword) {
      Alert.alert('Missing old password');
      return;
    }
    if (!newPassword) {
      Alert.alert('Missing new password');
      return;
    }
    if (!confirmPassword) {
      Alert.alert('Missing confirm password');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Confirm password doesn't match");
      return;
    }

    setPosting(true);

    putRequest<ResponseInterface, ChangePasswordPostInterface>(
      'user-password',
      {
        oldPassword,
        newPassword
      }
    ).subscribe((response: ResponseInterface) => {
      setPosting(false);

      if (response?.status) {
        Alert.alert('Successfully changed password');

        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        Alert.alert('Incorrect old password');
      }
    });
  }, [confirmPassword, newPassword, oldPassword]);

  return (
    <View
      style={[
        ChangePasswordScreenStyle.container,
        { paddingTop: top, paddingBottom: bottom + 10 }
      ]}
    >
      <ScreenHeader title="New password" />
      <View style={ChangePasswordScreenStyle.contentView}>
        <Text
          style={[
            ChangePasswordScreenStyle.inputTitleText,
            { color: theme.theme.colors.text }
          ]}
        >
          Old password
        </Text>
        <TextInput
          autoFocus
          autoCorrect={false}
          autoCapitalize="none"
          value={oldPassword}
          onChangeText={setOldPassword}
          style={[
            ChangePasswordScreenStyle.input,
            {
              backgroundColor: theme.theme.colors.surface,
              color: theme.theme.colors.text
            }
          ]}
        />
        <Text
          style={[
            ChangePasswordScreenStyle.inputTitleText,
            { color: theme.theme.colors.text }
          ]}
        >
          New password
        </Text>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={setNewPassword}
          value={newPassword}
          style={[
            ChangePasswordScreenStyle.input,
            {
              backgroundColor: theme.theme.colors.surface,
              color: theme.theme.colors.text
            }
          ]}
        />
        <Text
          style={[
            ChangePasswordScreenStyle.inputTitleText,
            { color: theme.theme.colors.text }
          ]}
        >
          Confirm new password
        </Text>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={[
            ChangePasswordScreenStyle.input,
            {
              backgroundColor: theme.theme.colors.surface,
              color: theme.theme.colors.text
            }
          ]}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={changePassword}
          style={ChangePasswordScreenStyle.saveView}
        >
          {posting ? (
            <ActivityIndicator color={COLORS.WHITE} />
          ) : (
            <Text style={ChangePasswordScreenStyle.saveText}>Save it</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

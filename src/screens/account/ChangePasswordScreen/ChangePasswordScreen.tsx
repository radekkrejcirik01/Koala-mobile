import React, { JSX, useCallback, useState } from 'react';
import { Alert, Keyboard, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useTheme } from '@hooks/useTheme';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { ChangePasswordScreenStyle } from '@screens/account/ChangePasswordScreen/ChangePasswordScreen.style';
import COLORS from '@constants/COLORS';
import { putRequest } from '@utils/Axios/Axios.service';
import { useDispatch } from 'react-redux';
import { ChangePasswordResponseInterface } from '@interfaces/response/Response.interface';
import { ChangePasswordPostInterface } from '@interfaces/post/Post.interface';
import { setUserToken } from '@store/UserReducer';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import { Button } from '@components/general/Button/Button';
import { FormIntro } from '@components/profile/FormIntro/FormIntro';
import { ProfileSection } from '@components/profile/ProfileSection/ProfileSection';

export const ChangePasswordScreen = (): JSX.Element => {
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const dispatch = useDispatch();

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

    putRequest<ChangePasswordResponseInterface, ChangePasswordPostInterface>(
      'user-password',
      {
        oldPassword,
        newPassword
      }
    ).subscribe((response: ChangePasswordResponseInterface) => {
      setPosting(false);

      if (response?.status === 'success') {
        // Changing the password revokes other sessions; keep this one alive
        if (response.token) {
          dispatch(setUserToken(response.token));
          PersistStorage.setItem(
            PersistStorageKeys.TOKEN,
            response.token
          ).catch();
        }

        Alert.alert('Successfully changed password');

        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        Alert.alert('Incorrect old password');
      }
    });
  }, [confirmPassword, dispatch, newPassword, oldPassword]);

  const inputStyle = [
    ChangePasswordScreenStyle.input,
    { color: theme.theme.colors.text }
  ];

  return (
    <View style={[ChangePasswordScreenStyle.container, { paddingTop: top }]}>
      <ScreenHeader title="Change password" />
      <KeyboardAwareScrollView
        bottomOffset={20}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={Keyboard.dismiss}
        contentContainerStyle={{ paddingBottom: bottom + 30 }}
      >
        <FormIntro
          emoji="🔒"
          emojiBackgroundColor={COLORS.PASTEL_YELLOW}
          title="Change your password"
        />
        <ProfileSection title="Current password">
          <TextInput
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
            textContentType="password"
            placeholder="Current password"
            placeholderTextColor={COLORS.LIGHTGRAY_100}
            selectionColor={COLORS.BUTTON_BLUE}
            value={oldPassword}
            onChangeText={setOldPassword}
            style={inputStyle}
          />
        </ProfileSection>
        <ProfileSection title="New password">
          <TextInput
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
            textContentType="newPassword"
            placeholder="New password"
            placeholderTextColor={COLORS.LIGHTGRAY_100}
            selectionColor={COLORS.BUTTON_BLUE}
            value={newPassword}
            onChangeText={setNewPassword}
            style={inputStyle}
          />
          <View style={ChangePasswordScreenStyle.separator} />
          <TextInput
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
            textContentType="newPassword"
            placeholder="Confirm new password"
            placeholderTextColor={COLORS.LIGHTGRAY_100}
            selectionColor={COLORS.BUTTON_BLUE}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={inputStyle}
          />
        </ProfileSection>
        <Button
          title="Save"
          posting={posting}
          onPress={changePassword}
          style={ChangePasswordScreenStyle.button}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

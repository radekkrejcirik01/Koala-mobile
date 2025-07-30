import React, { useCallback } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@hooks/useNavigation';
import { deleteRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { resetUserState } from '@store/UserReducer';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import { AccountScreenStyle } from '@screens/account/AccountScreen/AccountScreen.style';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { useTheme } from '@contexts/ThemeContext';

export const AccountScreen = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

  const deleteAccount = useCallback(() => {
    deleteRequest<ResponseInterface>('account').subscribe(
      (response: ResponseInterface) => {
        if (response?.status) {
          dispatch(resetUserState());
          PersistStorage.setItem(PersistStorageKeys.TOKEN, '').catch();
        }
      }
    );
  }, [dispatch]);

  const onPressDeleteAccount = useCallback(() => {
    Alert.alert('Are you sure you want to delete account?', '', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Confirm',
        onPress: deleteAccount,
        style: 'destructive'
      }
    ]);
  }, [deleteAccount]);

  const logout = useCallback(() => {
    deleteRequest<ResponseInterface>('device').subscribe(
      (response: ResponseInterface) => {
        if (response?.status) {
          dispatch(resetUserState());
          PersistStorage.setItem(PersistStorageKeys.TOKEN, '').catch();
        }
      }
    );
  }, [dispatch]);

  return (
    <View
      style={[
        AccountScreenStyle.container,
        { paddingTop: top, paddingBottom: bottom + 10 }
      ]}
    >
      <ScreenHeader title="Account" />
      <View style={AccountScreenStyle.contentContainer}>
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigateTo(AccountStackNavigatorEnum.EditNameScreen)}
            style={[
              AccountScreenStyle.buttonView,
              { backgroundColor: theme.theme.colors.surface }
            ]}
          >
            <Text
              style={[
                AccountScreenStyle.buttonText,
                { color: theme.theme.colors.text }
              ]}
            >
              Edit name
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              navigateTo(AccountStackNavigatorEnum.ChangePasswordScreen)
            }
            style={[
              AccountScreenStyle.buttonView,
              { backgroundColor: theme.theme.colors.surface }
            ]}
          >
            <Text
              style={[
                AccountScreenStyle.buttonText,
                { color: theme.theme.colors.text }
              ]}
            >
              Change password
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPressDeleteAccount}
            style={[
              AccountScreenStyle.buttonView,
              { backgroundColor: theme.theme.colors.surface }
            ]}
          >
            <Text
              style={[
                AccountScreenStyle.buttonText,
                { color: theme.theme.colors.text }
              ]}
            >
              Delete account
            </Text>
          </TouchableOpacity>
          <Text style={AccountScreenStyle.descriptionText}>
            By deleting account you will lose all your messages and sharing
            history.
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={logout}
          style={[
            AccountScreenStyle.buttonView,
            { backgroundColor: theme.theme.colors.surface }
          ]}
        >
          <Text
            style={[
              AccountScreenStyle.buttonText,
              { color: theme.theme.colors.text }
            ]}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

import React, { useCallback } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@hooks/useNavigation';
import { useTheme } from '@hooks/useTheme';
import { deleteRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { resetUserState } from '@store/UserReducer';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import { AccountScreenStyle } from '@screens/account/AccountScreen/AccountScreen.style';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { ProfileSection } from '@components/profile/ProfileSection/ProfileSection';
import { ProfileItem } from '@components/profile/ProfileItem/ProfileItem';
import COLORS from '@constants/COLORS';

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
        { paddingTop: top, paddingBottom: bottom || 10 }
      ]}
    >
      <ScreenHeader title="Account" />
      <ScrollView contentContainerStyle={AccountScreenStyle.contentContainer}>
        <View>
          <ProfileSection title="Personal">
            <ProfileItem
              onPress={() =>
                navigateTo(AccountStackNavigatorEnum.EditNameScreen)
              }
              icon="✏️"
              iconBackgroundColor={COLORS.PASTEL_BLUE}
              title="Edit name"
            />
            <ProfileItem
              onPress={() =>
                navigateTo(AccountStackNavigatorEnum.ChangePasswordScreen)
              }
              icon="🔒"
              iconBackgroundColor={COLORS.PASTEL_YELLOW}
              title="Change password"
              isLast
            />
          </ProfileSection>
          <ProfileSection footer="By deleting account you will lose all your messages and sharing history.">
            <ProfileItem
              onPress={onPressDeleteAccount}
              icon="🗑️"
              iconBackgroundColor={COLORS.WHITE_200}
              title="Delete account"
              destructive
              showChevron={false}
              isLast
            />
          </ProfileSection>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={logout}
          style={[
            AccountScreenStyle.logoutButton,
            { backgroundColor: theme.theme.colors.surface }
          ]}
        >
          <Text style={AccountScreenStyle.logoutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

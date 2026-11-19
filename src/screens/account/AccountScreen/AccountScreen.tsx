import React, { useCallback } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@hooks/useNavigation';
import { useTheme } from '@hooks/useTheme';
import { deleteRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { resetUserState } from '@store/UserReducer';
import { ReducerProps } from '@store/index/index.props';
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
  const { email } = useSelector((state: ReducerProps) => state.user.user);

  const dispatch = useDispatch();
  const theme = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

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
          <ProfileSection
            title="Personal"
            footer={
              email
                ? undefined
                : 'Add an email so you can reset your password if you forget it'
            }
          >
            <ProfileItem
              onPress={() =>
                navigateTo(AccountStackNavigatorEnum.EditNameScreen)
              }
              icon="✏️"
              iconBackgroundColor={COLORS.PASTEL_BLUE}
              title="Edit name"
            />
            <ProfileItem
              onPress={() => navigateTo(AccountStackNavigatorEnum.EmailScreen)}
              icon="✉️"
              iconBackgroundColor={COLORS.PASTEL_PURPLE}
              title={email ? 'Email' : 'Add email'}
              value={email}
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
        </View>
        <ProfileSection>
          <ProfileItem
            onPress={() =>
              navigateTo(AccountStackNavigatorEnum.DeleteAccountScreen)
            }
            icon="🗑️"
            iconBackgroundColor={COLORS.WHITE_200}
            title="Delete account"
            destructive
            isLast
          />
        </ProfileSection>
      </ScrollView>
    </View>
  );
};

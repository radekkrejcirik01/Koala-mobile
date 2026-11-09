import React, { useCallback } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import fs from 'react-native-fs';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import { useNavigation } from '@hooks/useNavigation';
import { useTheme } from '@hooks/useTheme';
import { ReducerProps } from '@store/index/index.props';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import {
  PHOTO_SIZE,
  ProfileScreenStyle
} from '@screens/account/ProfileScreen/ProfileScreen.style';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { ProfileItem } from '@components/profile/ProfileItem/ProfileItem';
import { ProfileSection } from '@components/profile/ProfileSection/ProfileSection';
import { postRequest } from '@utils/Axios/Axios.service';
import { setProfilePhotoAction } from '@store/UserReducer';
import { ProfilePhotoPostInterface } from '@interfaces/post/Post.interface';
import { ResponseProfilePhotoPostInterface } from '@interfaces/response/Response.interface';
import { ImagePickerOptions } from '@screens/account/ProfileScreen/ProfileScreen.options';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import COLORS from '@constants/COLORS';
import { version } from '../../../../package.json';

export const ProfileScreen = (): React.JSX.Element => {
  const { username, name, profilePhoto } = useSelector(
    (state: ReducerProps) => state.user.user
  );

  const dispatch = useDispatch();
  const theme = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

  const copyUsername = useCallback(() => {
    Clipboard.setString(username);
    trigger(HapticFeedbackTypes.impactLight);
    Toast.show({ type: 'success', text1: 'Copied!' });
  }, [username]);

  const addPhoto = useCallback(() => {
    ImagePicker.openPicker(ImagePickerOptions).then(async (image) => {
      const path = image?.path;
      const base64 = await fs.readFile(path, 'base64');

      dispatch(setProfilePhotoAction(path));

      postRequest<ResponseProfilePhotoPostInterface, ProfilePhotoPostInterface>(
        'profile-photo',
        {
          buffer: base64,
          fileName: image.filename
        }
      ).subscribe((response: ResponseProfilePhotoPostInterface) => {
        if (!response?.status) {
          Alert.alert("Sorry, we couldn't upload the photo");
        }
      });
    });
  }, [dispatch]);

  return (
    <View style={[ProfileScreenStyle.screen, { paddingTop: top }]}>
      <ScreenHeader title="Profile" />
      <ScrollView
        contentContainerStyle={[
          ProfileScreenStyle.contentContainerStyle,
          { paddingBottom: bottom || 10 }
        ]}
      >
        <View>
          <View style={ProfileScreenStyle.container}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={addPhoto}
              style={ProfileScreenStyle.photoContainer}
            >
              <ProfilePhoto
                name={name}
                photo={profilePhoto}
                size={PHOTO_SIZE}
                textBackgroundColor={COLORS.PASTEL_PURPLE}
                style={ProfileScreenStyle.photo}
                imageStyle={ProfileScreenStyle.photo}
                acronymStyle={ProfileScreenStyle.photo}
              />
              <View
                style={[
                  ProfileScreenStyle.photoBadge,
                  { borderColor: theme.theme.colors.background }
                ]}
              >
                <Text style={ProfileScreenStyle.photoBadgeText}>📷</Text>
              </View>
            </TouchableOpacity>
            <View style={ProfileScreenStyle.namesView}>
              <Text
                style={[
                  ProfileScreenStyle.name,
                  { color: theme.theme.colors.text }
                ]}
              >
                {name}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={copyUsername}
                style={ProfileScreenStyle.usernamePill}
              >
                <Text style={ProfileScreenStyle.username}>@{username}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ProfileSection title="Settings">
            <ProfileItem
              onPress={() =>
                navigateTo(AccountStackNavigatorEnum.AccountScreen)
              }
              icon="👤"
              iconBackgroundColor={COLORS.PASTEL_BLUE}
              title="Account"
            />
            <ProfileItem
              onPress={() => navigateTo(AccountStackNavigatorEnum.ThemeScreen)}
              icon="🎨"
              iconBackgroundColor={COLORS.PASTEL_PURPLE}
              title="Theme"
              isLast
            />
          </ProfileSection>

          <ProfileSection title="Help">
            <ProfileItem
              onPress={() =>
                navigateTo(AccountStackNavigatorEnum.SupportScreen)
              }
              icon="💬"
              iconBackgroundColor={COLORS.GREEN}
              title="Support"
            />
            <ProfileItem
              onPress={() =>
                navigateTo(AccountStackNavigatorEnum.FeedbackScreen)
              }
              icon="⭐️"
              iconBackgroundColor={COLORS.PASTEL_YELLOW}
              title="Feedback"
              isLast
            />
          </ProfileSection>
        </View>
        <Text style={ProfileScreenStyle.footerText}>Koala {version}</Text>
      </ScrollView>
    </View>
  );
};

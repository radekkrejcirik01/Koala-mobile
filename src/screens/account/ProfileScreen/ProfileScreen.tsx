import React, { useCallback } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import fs from 'react-native-fs';
import Share from 'react-native-share';
import { useNavigation } from '@hooks/useNavigation';
import { ReducerProps } from '@store/index/index.props';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { ProfileScreenStyle } from '@screens/account/ProfileScreen/ProfileScreen.style';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { ProfileItem } from '@components/profile/ProfileItem/ProfileItem';
import { postRequest } from '@utils/Axios/Axios.service';
import { setProfilePhotoAction } from '@store/UserReducer';
import { ProfilePhotoPostInterface } from '@interfaces/post/Post.interface';
import { ResponseProfilePhotoPostInterface } from '@interfaces/response/Response.interface';
import {
  ImagePickerOptions,
  ShareOptions
} from '@screens/account/ProfileScreen/ProfileScreen.options';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { useTheme } from '@contexts/ThemeContext';
import { version } from '../../../../package.json';

export const ProfileScreen = (): React.JSX.Element => {
  const { username, name, profilePhoto } = useSelector(
    (state: ReducerProps) => state.user.user
  );

  const dispatch = useDispatch();
  const theme = useTheme();
  const { top } = useSafeAreaInsets();
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

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

  const share = async () => {
    await Share.shareSingle(ShareOptions);
  };

  return (
    <ScrollView
      style={{ marginTop: top }}
      contentContainerStyle={ProfileScreenStyle.contentContainerStyle}
    >
      <View>
        <ScreenHeader title="Profile" goBack={false} />
        <View style={ProfileScreenStyle.container}>
          <View style={ProfileScreenStyle.photoContainer}>
            <ProfilePhoto name={name} photo={profilePhoto} size={80} />
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={addPhoto}
              style={[
                ProfileScreenStyle.photoButton,
                { backgroundColor: theme.theme.colors.surface }
              ]}
            >
              <Text style={ProfileScreenStyle.photoText}>Add photo</Text>
            </TouchableOpacity>
          </View>
          <View style={ProfileScreenStyle.namesView}>
            <Text
              style={[
                ProfileScreenStyle.name,
                { color: theme.theme.colors.text }
              ]}
            >
              {name}
            </Text>
            <Text style={ProfileScreenStyle.username}>{username}</Text>
          </View>
        </View>
        <View
          style={[
            ProfileScreenStyle.buttonsContainer,
            { backgroundColor: theme.theme.colors.surface }
          ]}
        >
          <ProfileItem
            onPress={() => navigateTo(AccountStackNavigatorEnum.AccountScreen)}
            icon="🌱"
            title="Account"
          />
          <ProfileItem
            onPress={() =>
              navigateTo(AccountStackNavigatorEnum.SharingHistoryScreen)
            }
            icon="📱"
            title="Sharing history"
          />
        </View>
        <View
          style={[
            ProfileScreenStyle.buttonsContainer,
            { backgroundColor: theme.theme.colors.surface }
          ]}
        >
          <ProfileItem
            onPress={() => navigateTo(AccountStackNavigatorEnum.SupportScreen)}
            icon="🫂"
            title="Support"
          />
          <ProfileItem
            onPress={() => navigateTo(AccountStackNavigatorEnum.FeedbackScreen)}
            icon="🫶"
            title="Feedback"
          />
        </View>
        <View
          style={[
            ProfileScreenStyle.buttonsContainer,
            { backgroundColor: theme.theme.colors.surface }
          ]}
        >
          <ProfileItem onPress={share} icon="❤️" title="Share Koala" />
        </View>
      </View>
      <View>
        <Text
          style={[ProfileScreenStyle.text, { color: theme.theme.colors.text }]}
        >
          Koala
        </Text>
        <Text
          style={[ProfileScreenStyle.text, { color: theme.theme.colors.text }]}
        >
          {version}
        </Text>
      </View>
    </ScrollView>
  );
};

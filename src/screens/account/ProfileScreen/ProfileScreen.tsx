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
import { ProfileHeader } from '@components/profile/ProfileHeader/ProfileHeader';
import { ProfileItem } from '@components/profile/ProfileItem/ProfileItem';
import { postRequest } from '@utils/Axios/Axios.service';
import { setProfilePhotoAction } from '@store/UserReducer';
import { ProfilePhotoPostInterface } from '@interfaces/post/Post.interface';
import { ResponseProfilePhotoPostInterface } from '@interfaces/response/Response.interface';
import {
  ImagePickerOptions,
  ShareOptions
} from '@screens/account/ProfileScreen/ProfileScreen.options';
import { version } from '../../../../package.json';

export const ProfileScreen = (): React.JSX.Element => {
  const { username, name, profilePhoto } = useSelector(
    (state: ReducerProps) => state.user.user
  );

  const dispatch = useDispatch();
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
        <ProfileHeader />
        <View style={ProfileScreenStyle.container}>
          <View>
            <ProfilePhoto name={name} photo={profilePhoto} size={75} />
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={addPhoto}
              style={ProfileScreenStyle.photoButton}
            >
              <Text style={ProfileScreenStyle.photoEmoji}>📷</Text>
            </TouchableOpacity>
          </View>
          <View style={ProfileScreenStyle.namesView}>
            <Text style={ProfileScreenStyle.name}>{name}</Text>
            <Text style={ProfileScreenStyle.username}>{username}</Text>
          </View>
        </View>
        <View style={ProfileScreenStyle.buttonsContainer}>
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
            isLast
          />
        </View>
        <View style={ProfileScreenStyle.buttonsContainer}>
          <ProfileItem
            onPress={() => navigateTo(AccountStackNavigatorEnum.SupportScreen)}
            icon="🫂"
            title="Support"
          />
          <ProfileItem
            onPress={() => navigateTo(AccountStackNavigatorEnum.FeedbackScreen)}
            icon="🫶"
            title="Feedback"
            isLast
          />
        </View>
        <View style={ProfileScreenStyle.buttonsContainer}>
          <ProfileItem onPress={share} icon="❤️" title="Share Koala" isLast />
        </View>
      </View>
      <View>
        <Text style={ProfileScreenStyle.text}>Koala Messenger</Text>
        <Text style={ProfileScreenStyle.text}>{version}</Text>
      </View>
    </ScrollView>
  );
};

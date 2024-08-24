import React, { useCallback } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import fs from 'react-native-fs';
import Share, { ShareSingleOptions, Social } from 'react-native-share';
import { useNavigation } from '@hooks/useNavigation';
import { ReducerProps } from '@store/index/index.props';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { ProfileScreenStyle } from '@screens/account/ProfileScreen/ProfileScreen.style';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { ProfileHeader } from '@components/profile/ProfileHeader/ProfileHeader';
import { ProfileItem } from '@components/profile/ProfileItem/ProfileItem';
import COLORS from '@constants/COLORS';
import { postRequest } from '@utils/Axios/Axios.service';
import { setProfilePhotoAction } from '@store/UserReducer';
import { ProfilePhotoPostInterface } from '@interfaces/post/Post.interface';
import { ResponseProfilePhotoPostInterface } from '@interfaces/response/Response.interface';
import { version } from '../../../../package.json';

export const ProfileScreen = (): React.JSX.Element => {
    const { username, name, profilePhoto } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const dispatch = useDispatch();
    const { top } = useSafeAreaInsets();
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const changeProfilePhoto = useCallback(() => {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            waitAnimationEnd: false
        }).then(async (image) => {
            const base64 = await fs.readFile(image?.path, 'base64');
            dispatch(setProfilePhotoAction(image?.path));

            postRequest<
                ResponseProfilePhotoPostInterface,
                ProfilePhotoPostInterface
            >('profile-photo', {
                buffer: base64,
                fileName: image.filename
            }).subscribe((response: ResponseProfilePhotoPostInterface) => {
                if (!response?.status) {
                    Alert.alert("Sorry, we couldn't upload the photo");
                }
            });
        });
    }, [dispatch]);

    const share = async () => {
        const shareOptions: ShareSingleOptions = {
            backgroundBottomColor: COLORS.BUTTON_BLUE,
            backgroundTopColor: COLORS.BUTTON_BLUE,
            stickerImage: Image.resolveAssetSource(
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                require('../../../assets/images/preview.png')
            ).uri,
            social: Social.InstagramStories,
            appId: 'app.com.koala'
        };

        await Share.shareSingle(shareOptions);
    };

    return (
        <ScrollView
            style={{ marginTop: top }}
            contentContainerStyle={ProfileScreenStyle.contentContainerStyle}
        >
            <View>
                <ProfileHeader />
                <View style={ProfileScreenStyle.container}>
                    <TouchableOpacity onPress={changeProfilePhoto}>
                        <ProfilePhoto
                            name={name}
                            photo={profilePhoto}
                            size={75}
                        />
                    </TouchableOpacity>
                    <View style={ProfileScreenStyle.namesView}>
                        <Text style={ProfileScreenStyle.name}>{name}</Text>
                        <Text style={ProfileScreenStyle.username}>
                            {username}
                        </Text>
                    </View>
                </View>
                <View style={ProfileScreenStyle.buttonsContainer}>
                    <ProfileItem
                        onPress={() =>
                            navigateTo(AccountStackNavigatorEnum.AccountScreen)
                        }
                        icon="🌱"
                        title="Account"
                    />
                    <ProfileItem
                        onPress={() =>
                            navigateTo(
                                AccountStackNavigatorEnum.SharingHistoryScreen
                            )
                        }
                        icon="📱"
                        title="Sharing history"
                        isLast
                    />
                </View>
                <View style={ProfileScreenStyle.buttonsContainer}>
                    <ProfileItem
                        onPress={() =>
                            navigateTo(AccountStackNavigatorEnum.SupportScreen)
                        }
                        icon="🫂"
                        title="Support"
                    />
                    <ProfileItem
                        onPress={() =>
                            navigateTo(AccountStackNavigatorEnum.FeedbackScreen)
                        }
                        icon="🫶"
                        title="Feedback"
                        isLast
                    />
                </View>
                <View style={ProfileScreenStyle.buttonsContainer}>
                    <ProfileItem
                        onPress={share}
                        icon="❤️"
                        title="Share Koala"
                        isLast
                    />
                </View>
            </View>
            <View>
                <Text style={ProfileScreenStyle.text}>Koala Messenger</Text>
                <Text style={ProfileScreenStyle.text}>{version}</Text>
            </View>
        </ScrollView>
    );
};

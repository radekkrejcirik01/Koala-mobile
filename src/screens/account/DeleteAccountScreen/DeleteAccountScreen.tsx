import React, { JSX, useCallback, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@hooks/useTheme';
import { deleteRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { resetUserState } from '@store/UserReducer';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import { DeleteAccountScreenStyle } from '@screens/account/DeleteAccountScreen/DeleteAccountScreen.style';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { Button } from '@components/general/Button/Button';
import { FormIntro } from '@components/profile/FormIntro/FormIntro';
import { ProfileSection } from '@components/profile/ProfileSection/ProfileSection';
import COLORS from '@constants/COLORS';

const DELETED_DATA = [
  {
    icon: '👤',
    title: 'Profile',
    description: 'Your name, username, profile photo and email'
  },
  {
    icon: '💬',
    title: 'Chats',
    description: 'All your chats and the messages in them'
  },
  {
    icon: '🫶',
    title: 'Emotions',
    description: 'Every emotion you shared and the support you got'
  },
  {
    icon: '👥',
    title: 'Friends',
    description: 'Your friends and friend requests'
  }
];

export const DeleteAccountScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { top, bottom } = useSafeAreaInsets();

  const [posting, setPosting] = useState<boolean>(false);

  const deleteAccount = useCallback(() => {
    setPosting(true);

    deleteRequest<ResponseInterface>('account').subscribe(
      (response: ResponseInterface) => {
        setPosting(false);

        if (response?.status) {
          dispatch(resetUserState());
          PersistStorage.setItem(PersistStorageKeys.TOKEN, '').catch();
        } else {
          Alert.alert('Something went wrong. Please try again.');
        }
      }
    );
  }, [dispatch]);

  const onPressDelete = useCallback(() => {
    Alert.alert(
      'Delete your account?',
      "Everything listed will be deleted for good. This can't be undone.",
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: deleteAccount,
          style: 'destructive'
        }
      ]
    );
  }, [deleteAccount]);

  return (
    <View style={[DeleteAccountScreenStyle.container, { paddingTop: top }]}>
      <ScreenHeader title="Delete account" />
      <ScrollView contentContainerStyle={{ paddingBottom: bottom + 30 }}>
        <FormIntro
          emoji="🗑️"
          emojiBackgroundColor={COLORS.WHITE_200}
          title="Deleting your account removes everything"
        />
        <ProfileSection
          title="What will be deleted"
          footer="Your friends won't be able to find you or send you anything anymore. This can't be undone."
        >
          {DELETED_DATA.map((item, index) => (
            <View key={item.title} style={DeleteAccountScreenStyle.item}>
              <View style={DeleteAccountScreenStyle.iconView}>
                <Text style={DeleteAccountScreenStyle.icon}>{item.icon}</Text>
              </View>
              <View
                style={[
                  DeleteAccountScreenStyle.content,
                  index === DELETED_DATA.length - 1 &&
                    DeleteAccountScreenStyle.noBorder
                ]}
              >
                <Text
                  style={[
                    DeleteAccountScreenStyle.title,
                    { color: theme.theme.colors.text }
                  ]}
                >
                  {item.title}
                </Text>
                <Text style={DeleteAccountScreenStyle.description}>
                  {item.description}
                </Text>
              </View>
            </View>
          ))}
        </ProfileSection>
        <Button
          title="Delete account"
          posting={posting}
          onPress={onPressDelete}
          style={DeleteAccountScreenStyle.button}
        />
      </ScrollView>
    </View>
  );
};

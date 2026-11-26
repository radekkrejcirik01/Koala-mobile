import React, { JSX, useCallback, useState } from 'react';
import { Image, RefreshControl, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { forkJoin } from 'rxjs';
import { useNavigation } from '@hooks/useNavigation';
import { HomeContentStyle } from '@components/home/HomeContent/HomeContent.style';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { getRequest } from '@utils/Axios/Axios.service';
import {
  ResponseInvitesGetInterface,
  ResponseUnreadChatsGetInterface
} from '@interfaces/response/Response.interface';
import { useTheme } from '@hooks/useTheme';
import { getIllustration } from '@functions/getIllustration';
import { setUnseenInvites } from '@store/NotificationsReducer';
import { NotificationsService } from '@utils/general/NotificationsService';
import { ReducerProps } from '@store/index/index.props';
import { ChatsBadge } from '@components/home/ChatsBadge/ChatsBadge';
import { HomeButton } from '@components/home/HomeButton/HomeButton';

export const HomeContent = (): JSX.Element => {
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);
  const dispatch = useDispatch();
  const { isDark } = useTheme();

  const { image } = useSelector((state: ReducerProps) => state.user);

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    forkJoin([
      getRequest<ResponseUnreadChatsGetInterface>('chats/unread'),
      getRequest<ResponseInvitesGetInterface>('invites')
    ]).subscribe(([chatsResponse, invitesResponse]) => {
      if (chatsResponse?.status) {
        NotificationsService.setUnreadChats(chatsResponse.unreadChats ?? 0);
      }
      if (invitesResponse?.status) {
        dispatch(setUnseenInvites(invitesResponse.data?.length ?? 0));
      }

      setRefreshing(false);
    });
  }, [dispatch]);

  const imageSource = getIllustration(image, isDark);

  const onPressChats = () => {
    navigateTo(AccountStackNavigatorEnum.ChatsScreen);
  };

  const onPressShare = useCallback(() => {
    navigateTo(AccountStackNavigatorEnum.ShareStack);
  }, [navigateTo]);

  return (
    <View style={HomeContentStyle.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={HomeContentStyle.scrollView}
        contentContainerStyle={HomeContentStyle.scrollViewContainer}
      >
        <Image
          source={imageSource}
          style={HomeContentStyle.image}
          resizeMode="contain"
        />
      </ScrollView>
      <View style={HomeContentStyle.footerContainer}>
        <HomeButton text="Share" onPress={onPressShare} />
        <View style={HomeContentStyle.footerButtonRow}>
          <HomeButton text="Chats 💬" onPress={onPressChats} />
          <ChatsBadge />
        </View>
      </View>
    </View>
  );
};

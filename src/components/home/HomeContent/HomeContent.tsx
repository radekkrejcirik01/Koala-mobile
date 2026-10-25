import React, { JSX, useCallback, useMemo, useState } from 'react';
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
  ResponseUnseenNotificationsGetInterface
} from '@interfaces/response/Response.interface';
import { Images } from '@enums/images';
import {
  setUnseenInvites,
  setUnseenNotifications
} from '@store/NotificationsReducer';
import { ReducerProps } from '@store/index/index.props';
import { NotificationsBadge } from '@components/home/NotificationsBadge/NotificationsBadge.tsx';
import { HomeButton } from '@components/home/HomeButton/HomeButton';

export const HomeContent = (): JSX.Element => {
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);
  const dispatch = useDispatch();

  const { image } = useSelector((state: ReducerProps) => state.user);

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    forkJoin([
      getRequest<ResponseUnseenNotificationsGetInterface>(
        'unseen-notifications'
      ),
      getRequest<ResponseInvitesGetInterface>('invites')
    ]).subscribe(([notificationsResponse, invitesResponse]) => {
      if (notificationsResponse?.status) {
        dispatch(
          setUnseenNotifications(notificationsResponse.unseenNotifications)
        );
      }
      if (invitesResponse?.status) {
        dispatch(setUnseenInvites(invitesResponse.data?.length ?? 0));
      }

      setRefreshing(false);
    });
  }, [dispatch]);

  const imageSource = useMemo(() => {
    if (image === Images.ROOM) {
      return require('@assets/illustrations/room.jpg');
    }
    if (image === Images.PARK) {
      return require('@assets/illustrations/park.jpg');
    }
    if (image === Images.SEA) {
      return require('@assets/illustrations/sea.jpg');
    }
    return undefined;
  }, [image]);

  const onPressChats = () => {
    navigateTo(AccountStackNavigatorEnum.NotificationsScreen);
  };

  const onPressShare = useCallback(() => {
    navigateTo(AccountStackNavigatorEnum.ShareScreen);
  }, [navigateTo]);

  return (
    <View style={HomeContentStyle.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={HomeContentStyle.scrollView}
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
          <NotificationsBadge />
        </View>
      </View>
    </View>
  );
};

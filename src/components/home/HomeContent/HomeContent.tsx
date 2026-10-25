import React, { JSX, useCallback, useMemo } from 'react';
import { Image, RefreshControl, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@hooks/useNavigation';
import { useTheme } from '@hooks/useTheme';
import { HomeContentStyle } from '@components/home/HomeContent/HomeContent.style';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import COLORS from '@constants/COLORS';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import { Images } from '@enums/images';
import { setImageAction } from '@store/UserReducer';
import { ReducerProps } from '@store/index/index.props';
import { NotificationsBadge } from '@components/home/NotificationsBadge/NotificationsBadge.tsx';
import { HomeButton } from '@components/home/HomeButton/HomeButton';

export const HomeContent = (): JSX.Element => {
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);
  const dispatch = useDispatch();

  const { image } = useSelector((state: ReducerProps) => state.user);

  const setNewImage = () => {
    let value = image;
    if (value === Images.ROOM) {
      value = Images.PARK;
    } else if (value === Images.PARK) {
      value = Images.SEA;
    } else if (value === Images.SEA) {
      value = Images.ROOM;
    }

    dispatch(setImageAction(value));
    PersistStorage.setItem(PersistStorageKeys.IMAGE, value.toString()).catch();
  };

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
          <RefreshControl refreshing={false} onRefresh={setNewImage} />
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

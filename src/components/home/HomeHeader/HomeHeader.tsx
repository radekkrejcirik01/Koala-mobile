import React, { JSX } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';
import { useNavigation } from '@hooks/useNavigation';
import { useHomeHeaderStyle } from '@components/home/HomeHeader/HomeHeader.style';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { ReducerProps } from '@store/index/index.props';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { InvitesBadge } from '@components/home/InvitesBadge/InvitesBadge';
import { useTheme } from '@hooks/useTheme';

export const HomeHeader = (): JSX.Element => {
  const HomeHeaderStyle = useHomeHeaderStyle();
  const { colors } = useTheme().theme;
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

  const { name, profilePhoto } = useSelector(
    (state: ReducerProps) => state.user.user
  );

  const onPressFriends = () => {
    trigger(HapticFeedbackTypes.impactLight);
    navigateTo(AccountStackNavigatorEnum.FriendsScreen);
  };

  const onPressSharedEmotions = () => {
    trigger(HapticFeedbackTypes.impactLight);
    navigateTo(AccountStackNavigatorEnum.AnalyticsScreen);
  };

  const onPressProfile = () => {
    trigger(HapticFeedbackTypes.impactLight);
    navigateTo(AccountStackNavigatorEnum.ProfileScreen);
  };

  return (
    <View style={HomeHeaderStyle.container}>
      <View style={HomeHeaderStyle.buttonsRow}>
        <View style={HomeHeaderStyle.addFriendsContainer}>
          <TouchableOpacity
            onPress={onPressFriends}
            activeOpacity={0.8}
            style={HomeHeaderStyle.addFriendsView}
          >
            <Icon name={IconEnum.ADD_FRIEND} size={20} color={colors.text} />
          </TouchableOpacity>
          <InvitesBadge />
        </View>
        <TouchableOpacity
          onPress={onPressSharedEmotions}
          activeOpacity={0.8}
          style={HomeHeaderStyle.sharedEmotionsView}
        >
          <Icon name={IconEnum.STATS} size={18} color={colors.text} />
        </TouchableOpacity>
      </View>
      <ProfilePhoto
        name={name}
        photo={profilePhoto}
        size={45}
        onPhotoPress={onPressProfile}
      />
    </View>
  );
};

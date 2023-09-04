import React, { JSX } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@hooks/useNavigation';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { HomeScreenStyle } from '@screens/account/HomeScreen/HomeScreen.style';
import { Badge } from '@components/general/Badge/Badge';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { ReducerProps } from '@store/index/index.props';

export const NotificationsHeader = (): JSX.Element => {
    const { unseenNotifications } = useSelector(
        (state: ReducerProps) => state.notifications
    );

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
                navigateTo(AccountStackNavigatorEnum.NotificationsScreen)
            }
        >
            <Icon
                name={IconEnum.MAIL}
                size={26}
                style={HomeScreenStyle.marginRight}
            />
            <Badge value={unseenNotifications} />
        </TouchableOpacity>
    );
};

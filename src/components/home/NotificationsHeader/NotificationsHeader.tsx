import React, { JSX } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@hooks/useNavigation';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { Badge } from '@components/general/Badge/Badge';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { ReducerProps } from '@store/index/index.props';
import { NotificationsHeaderStyle } from '@components/home/NotificationsHeader/NotificationsHeader.style';

export const NotificationsHeader = (): JSX.Element => {
    const { unseenNotifications } = useSelector(
        (state: ReducerProps) => state.notifications
    );

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            hitSlop={10}
            onPress={() =>
                navigateTo(AccountStackNavigatorEnum.NotificationsScreen)
            }
            style={NotificationsHeaderStyle.container}
        >
            <Icon name={IconEnum.MAIL} size={26} />
            <Badge value={unseenNotifications} />
        </TouchableOpacity>
    );
};

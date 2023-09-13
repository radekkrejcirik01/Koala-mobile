import { StackNavigationOptions } from '@react-navigation/stack';
import COLORS from '@constants/COLORS';
import { AccountStackNavigatorStyle } from '@navigation/StackNavigators/account/AccountStackNavigator.style';

export const NotificationsOptions: StackNavigationOptions = {
    title: 'Notifications',
    headerTintColor: COLORS.BLACK,
    headerBackTitleVisible: false,
    headerStyle: AccountStackNavigatorStyle.notificationsHeader
};

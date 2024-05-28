import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const BottomTabNavigatorStyle = StyleSheet.create({
    tabBarLabel: {
        fontSize: 11,
        fontWeight: '500'
    },
    tabBarIconEmoji: {
        marginTop: 5,
        fontSize: 20,
        color: COLORS.BLACK_50
    },
    tabBarIconImage: {
        height: 25,
        width: 25,
        marginTop: 5,
        opacity: 0.8
    }
});

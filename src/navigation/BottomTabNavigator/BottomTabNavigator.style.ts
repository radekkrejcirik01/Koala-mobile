import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const BottomTabNavigatorStyle = StyleSheet.create({
    header: {
        shadowOpacity: 0,
        backgroundColor: 'lightblue'
    },
    tabBar: {
        paddingTop: 5,
        paddingHorizontal: '5%',
        borderTopWidth: 0,
        backgroundColor: 'lightblue'
    },
    tabBarLabel: {
        color: COLORS.WHITE,
        fontWeight: '500'
    }
});

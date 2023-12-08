import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeScreenHeaderStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileButtonView: {
        marginHorizontal: 10
    },
    homeTitleText: {
        fontSize: 34,
        color: COLORS.BLACK,
        fontWeight: 'bold'
    }
});

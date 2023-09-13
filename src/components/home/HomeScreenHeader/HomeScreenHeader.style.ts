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
        marginRight: 15
    },
    homeTitleText: {
        fontSize: 30,
        color: COLORS.BLACK_50,
        fontWeight: 'bold'
    }
});

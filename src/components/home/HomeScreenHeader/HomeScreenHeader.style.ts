import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeScreenHeaderStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row'
    },
    emojiText: {
        marginLeft: 15,
        marginRight: 5,
        fontSize: 32
    },
    homeTitleText: {
        fontSize: 34,
        color: COLORS.BLACK,
        fontWeight: 'bold'
    }
});

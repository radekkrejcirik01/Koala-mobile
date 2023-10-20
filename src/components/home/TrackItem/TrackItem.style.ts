import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const TrackItemStyle = StyleSheet.create({
    container: {
        paddingVertical: 8,
        flexDirection: 'row'
    },
    textsView: {
        flex: 1
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    messageText: {
        flex: 1,
        marginRight: 20,
        color: COLORS.BLACK,
        fontWeight: '500'
    },
    colorBlack: {
        color: COLORS.BLACK
    }
});

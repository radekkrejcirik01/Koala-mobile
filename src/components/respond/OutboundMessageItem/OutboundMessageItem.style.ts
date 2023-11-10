import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const OutboundMessageItemStyle = StyleSheet.create({
    container: {
        marginTop: 14
    },
    timeText: {
        marginLeft: 15,
        paddingTop: 5,
        alignSelf: 'center'
    },
    messageText: {
        maxWidth: '60%',
        minWidth: 100,
        fontSize: 22,
        color: COLORS.BLACK_50,
        backgroundColor: 'whitesmoke',
        alignSelf: 'flex-end',
        textAlign: 'right',
        fontWeight: '600'
    },
    largeText: {
        fontSize: 40
    }
});

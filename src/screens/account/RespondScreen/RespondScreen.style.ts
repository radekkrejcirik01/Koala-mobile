import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const RespondScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    scrollViewContainer: {
        paddingHorizontal: 10,
        paddingBottom: 250
    },
    inboundText: {
        maxWidth: '60%',
        marginTop: 14,
        fontSize: 22,
        color: COLORS.BLACK_50,
        fontWeight: '600'
    },
    outboundText: {
        maxWidth: '60%',
        marginTop: 14,
        fontSize: 22,
        color: COLORS.BLACK_50,
        fontWeight: '600',
        alignSelf: 'flex-end',
        textAlign: 'right'
    },
    heartMessageText: {
        fontSize: 40
    },
    supportView: {
        paddingTop: 10,
        paddingBottom: 20
    },
    supportText: {
        fontSize: 20,
        color: COLORS.BLACK_50,
        textAlign: 'center',
        fontWeight: '600'
    },
    inputContainer: {
        paddingVertical: 5,
        backgroundColor: 'whitesmoke',
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputView: {
        flex: 1,
        minHeight: 42,
        paddingVertical: 4,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.LIGHTGRAY,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        paddingRight: 20,
        paddingTop: 0, // overwrite default value
        paddingBottom: 0, // overwrite default value
        fontSize: 16,
        color: COLORS.BLACK_50
    },
    heartView: {
        marginLeft: 10,
        marginRight: 8,
        paddingBottom: 2
    },
    heartText: {
        color: COLORS.BLACK_50,
        fontSize: 25
    }
});

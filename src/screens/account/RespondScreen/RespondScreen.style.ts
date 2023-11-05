import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const RespondScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    scrollViewContainer: {
        paddingHorizontal: 5,
        paddingBottom: 250
    },
    inboundText: {
        maxWidth: '72%',
        marginTop: 14,
        fontSize: 22,
        color: COLORS.BLACK_50,
        fontWeight: '600'
    },
    outboundText: {
        maxWidth: '72%',
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
        marginVertical: 10,
        marginHorizontal: '15%'
    },
    supportText: {
        textAlign: 'center',
        fontSize: 18,
        color: COLORS.BLACK_50,
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

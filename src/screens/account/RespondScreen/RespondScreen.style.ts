import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const RespondScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    scrollViewContainer: {
        paddingHorizontal: 15,
        paddingBottom: 300
    },
    inboundText: {
        maxWidth: '65%',
        marginTop: 12,
        fontSize: 22,
        color: COLORS.BLACK_50,
        fontWeight: '600'
    },
    outboundText: {
        maxWidth: '65%',
        marginTop: 12,
        fontSize: 22,
        color: COLORS.BLACK_50,
        fontWeight: '600',
        alignSelf: 'flex-end',
        textAlign: 'right'
    },
    heartMessageText: {
        fontSize: 45
    },
    inputContainer: {
        paddingVertical: 5,
        backgroundColor: 'whitesmoke',
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputView: {
        flex: 1,
        minHeight: 45,
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
        marginLeft: 15,
        marginRight: 10
    },
    heartText: {
        fontSize: 26
    }
});

import { Platform, StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const RespondScreenStyle = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollViewContainer: {
        paddingHorizontal: 20,
        paddingBottom: Platform.OS === 'ios' ? 300 : 100
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
    inputContainer: {
        marginHorizontal: 4,
        paddingVertical: 5,
        paddingHorizontal: 5,
        backgroundColor: 'whitesmoke',
        flexDirection: 'row'
    },
    inputView: {
        flex: 1,
        minHeight: 42,
        paddingVertical: 4,
        paddingLeft: 15,
        paddingRight: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.LIGHTGRAY,
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
    }
});

import { Platform, StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const RespondScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE
    },
    scrollViewContainer: {
        paddingLeft: 20,
        paddingRight: 15,
        paddingBottom: Platform.OS === 'ios' ? 280 : 100
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
    largeText: {
        fontSize: 40
    },
    inputContainer: {
        paddingBottom: 5,
        backgroundColor: COLORS.WHITE,
        flexDirection: 'row'
    },
    inputView: {
        flex: 1,
        minHeight: 42,
        marginHorizontal: 6,
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

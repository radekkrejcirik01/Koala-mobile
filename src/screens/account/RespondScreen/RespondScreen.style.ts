import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const RespondScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    scrollViewContainer: {
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: '75%'
    },
    messageText: {
        maxWidth: '80%',
        paddingBottom: 10,
        fontSize: 26,
        color: COLORS.BLACK,
        fontWeight: '600'
    },
    responseText: {
        marginTop: 8,
        fontSize: 22,
        color: COLORS.BLACK,
        maxWidth: '75%',
        fontWeight: '600',
        alignSelf: 'flex-end',
        textAlign: 'right'
    },
    inputContainer: {
        paddingVertical: 5,
        backgroundColor: 'whitesmoke'
    },
    inputView: {
        width: '98%',
        minHeight: 45,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: COLORS.WHITE,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        paddingRight: 20,
        paddingBottom: 5,
        fontSize: 16,
        color: COLORS.BLACK
    }
});

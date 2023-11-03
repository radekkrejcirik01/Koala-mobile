import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const RespondScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    scrollViewContainer: {
        paddingHorizontal: 15,
        paddingBottom: '100%'
    },
    messageText: {
        maxWidth: '65%',
        marginTop: 12,
        fontSize: 22,
        color: COLORS.BLACK,
        fontWeight: '600'
    },
    responseText: {
        maxWidth: '65%',
        marginTop: 12,
        fontSize: 22,
        color: COLORS.BLACK,
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
        color: COLORS.BLACK
    }
});

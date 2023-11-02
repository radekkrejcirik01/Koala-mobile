import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const RespondScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    messageText: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: '10%',
        fontSize: 26,
        fontWeight: '600'
    },
    responseText: {
        marginTop: 15,
        fontSize: 20,
        marginRight: 15,
        maxWidth: '75%',
        fontWeight: '600',
        alignSelf: 'flex-end',
        textAlign: 'right'
    },
    inputView: {
        width: '95%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: COLORS.WHITE,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        paddingRight: 20
    }
});

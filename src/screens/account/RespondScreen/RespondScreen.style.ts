import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const RespondScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    scrollViewContainer: {
        paddingTop: 20,
        paddingHorizontal: 10
    },
    messageText: {
        maxWidth: '80%',
        paddingBottom: 10,
        fontSize: 26,
        fontWeight: '600'
    },
    responseText: {
        marginTop: 8,
        fontSize: 22,
        marginRight: 15,
        maxWidth: '75%',
        fontWeight: '600',
        alignSelf: 'flex-end',
        textAlign: 'right'
    },
    inputView: {
        width: '98%',
        minHeight: 45,
        paddingLeft: 15,
        paddingRight: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.BUTTON_BLUE,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        paddingRight: 20,
        paddingBottom: 5,
        fontSize: 16
    }
});

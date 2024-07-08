import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ShareModalScreenStyle = StyleSheet.create({
    container: {
        minHeight: '50%',
        paddingTop: 20,
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.WHITE
    },
    messageText: {
        fontSize: 24,
        color: COLORS.BLACK,
        fontWeight: 'bold'
    },
    content: {
        flexGrow: 1,
        paddingTop: 25,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    send: {
        width: '45%',
        paddingLeft: 10,
        paddingBottom: 70,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

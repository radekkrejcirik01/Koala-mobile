import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const DirectSharingModalScreenStyle = StyleSheet.create({
    container: {
        height: '80%',
        paddingTop: 30,
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.WHITE,
        justifyContent: 'space-between'
    },
    inputView: {
        flex: 1
    },
    input: {
        fontSize: 18,
        color: COLORS.BLACK_50,
        textAlignVertical: 'top',
        fontWeight: 'bold'
    },
    send: {
        justifyContent: 'center',
        alignSelf: 'flex-end'
    }
});

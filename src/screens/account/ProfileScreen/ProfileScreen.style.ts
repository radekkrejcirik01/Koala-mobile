import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ProfileScreenStyle = StyleSheet.create({
    contentContainerStyle: {
        flexGrow: 1,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'space-between'
    },
    container: {
        paddingVertical: 20,
        alignItems: 'center'
    },
    namesView: {
        alignItems: 'center'
    },
    name: {
        fontSize: 25,
        color: COLORS.BLACK_50,
        fontWeight: '600'
    },
    username: {
        fontSize: 16,
        color: COLORS.PURPLE,
        fontWeight: '500'
    },
    buttonsContainer: {
        marginTop: 20,
        marginHorizontal: 15,
        borderRadius: 10,
        backgroundColor: COLORS.WHITE_100
    },
    text: {
        marginTop: 5,
        color: COLORS.GRAY_200,
        alignSelf: 'center'
    }
});

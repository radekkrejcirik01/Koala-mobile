import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ProfileScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 20
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profileContainer: {
        paddingVertical: 20,
        paddingLeft: 10,
        flexDirection: 'row'
    },
    profileNamesView: {
        marginLeft: 10
    },
    nameText: {
        fontSize: 25,
        color: COLORS.BLACK_50,
        fontWeight: '600'
    },
    usernameText: {
        fontSize: 18,
        color: COLORS.GRAY_200,
        fontWeight: '500'
    },
    buttonsContainer: {
        borderRadius: 10,
        backgroundColor: COLORS.WHITE
    },
    buttonView: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    versionText: {
        color: COLORS.GRAY_200,
        alignSelf: 'center'
    }
});

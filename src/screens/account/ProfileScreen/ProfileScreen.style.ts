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
        color: COLORS.BLACK,
        fontWeight: '600'
    },
    usernameText: {
        fontSize: 16,
        color: COLORS.GRAY_200,
        fontWeight: '500'
    },
    buttonsContainer: {
        borderRadius: 10,
        backgroundColor: 'whitesmoke'
    },
    buttonView: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 0.4,
        borderBottomColor: COLORS.LIGHTGRAY,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonText: {
        fontSize: 16,
        color: COLORS.BLACK,
        fontWeight: '600'
    },
    text: {
        marginTop: 5,
        color: COLORS.GRAY_200,
        alignSelf: 'center'
    }
});

import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ProfileScreenStyle = StyleSheet.create({
    contentContainerStyle: {
        flexGrow: 1,
        paddingTop: 10,
        paddingLeft: 15,
        paddingBottom: 10,
        paddingRight: 20,
        justifyContent: 'space-between'
    },
    container: {
        paddingVertical: 20,
        alignItems: 'center'
    },
    namesView: {
        alignItems: 'center'
    },
    nameText: {
        fontSize: 25,
        color: COLORS.BLACK_50,
        fontWeight: '600'
    },
    usernameText: {
        fontSize: 16,
        color: COLORS.LIGHTGRAY_200,
        fontWeight: '500'
    },
    buttonsContainer: {
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: COLORS.WHITE_100
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

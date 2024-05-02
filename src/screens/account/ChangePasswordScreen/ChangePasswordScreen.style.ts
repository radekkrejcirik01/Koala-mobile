import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChangePasswordScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 20
    },
    contentView: {
        paddingTop: 10
    },
    inputTitleText: {
        marginTop: 15,
        color: COLORS.BLACK,
        fontWeight: '500'
    },
    input: {
        height: 45,
        paddingHorizontal: 15,
        borderRadius: 10,
        fontSize: 16,
        color: COLORS.GRAY_200,
        backgroundColor: 'whitesmoke',
        fontWeight: '500'
    },
    saveView: {
        height: 45,
        width: 110,
        marginTop: 50,
        borderRadius: 18,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    saveText: {
        fontSize: 18,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});

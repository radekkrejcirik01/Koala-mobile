import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const SecondIntroductionScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        paddingHorizontal: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    description: {
        marginTop: 20,
        paddingRight: 35,
        fontSize: 15,
        fontWeight: 'bold'
    },
    image: {
        marginTop: 70,
        width: '100%',
        height: 250
    },
    buttonView: {
        width: '100%',
        height: 45,
        marginTop: '30%',
        borderRadius: 10,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});

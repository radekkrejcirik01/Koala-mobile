import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const FirstScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 75,
        height: 75
    },
    titleText: {
        fontSize: 26,
        fontWeight: 'bold'
    },
    descriptionText: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttonView: {
        width: '100%',
        height: 50,
        marginTop: '80%',
        borderRadius: 10,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});

import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const CheckOnScreenStyle = StyleSheet.create({
    contentContainer: {
        paddingTop: '35%',
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    titleText: {
        fontSize: 26,
        color: COLORS.LIGHTGRAY_100,
        fontWeight: 'bold',
        alignSelf: 'flex-end'
    },
    descriptionText: {
        marginTop: 2,
        color: COLORS.LIGHTGRAY_100,
        alignSelf: 'flex-end',
        fontWeight: 'bold'
    },
    input: {
        marginTop: 35,
        marginLeft: 10,
        padding: 0, // Overwrite default value
        fontSize: 26,
        color: COLORS.BUTTON_BLUE,
        fontWeight: 'bold'
    },
    send: {
        marginTop: 35,
        alignSelf: 'flex-end',
        justifyContent: 'center'
    }
});

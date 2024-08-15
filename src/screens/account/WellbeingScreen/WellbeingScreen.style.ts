import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const WellbeingScreenStyle = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    scrollView: {
        paddingTop: 10
    },
    imageContainer: {
        height: 200,
        justifyContent: 'center'
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: 'center'
    },
    description: {
        width: '65%',
        marginTop: 10,
        color: COLORS.LIGHTGRAY_200,
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: '500'
    },
    messagesContainer: {
        paddingLeft: 25,
        paddingRight: 20,
        paddingTop: 35
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    }
});

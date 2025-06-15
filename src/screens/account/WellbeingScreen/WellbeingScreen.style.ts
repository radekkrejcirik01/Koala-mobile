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
    line: {
        marginHorizontal: 25,
        marginTop: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: COLORS.LIGHTGRAY
    },
    messagesContainer: {
        paddingLeft: 25,
        paddingRight: 20
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    }
});

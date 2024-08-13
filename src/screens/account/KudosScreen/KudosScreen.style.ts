import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const KudosScreenStyle = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    addButtonText: {
        fontSize: 15,
        color: COLORS.PURPLE,
        fontWeight: 'bold'
    },
    scrollView: {
        paddingTop: 10
    },
    imageContainer: {
        height: 200,
        justifyContent: 'center'
    },
    image: {
        width: 180,
        height: 180,
        alignSelf: 'center'
    },
    messagesContainer: {
        paddingHorizontal: 25,
        paddingTop: 35
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    }
});

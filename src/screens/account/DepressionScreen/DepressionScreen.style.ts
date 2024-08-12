import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const DepressionScreenStyle = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    addButtonText: {
        fontSize: 15,
        color: COLORS.PURPLE,
        fontWeight: 'bold'
    },
    scrollView: {
        paddingTop: 20
    },
    imageContainer: {
        height: 200,
        justifyContent: 'center'
    },
    image: {
        width: 230,
        height: 230,
        alignSelf: 'center'
    },
    messagesContainer: {
        paddingHorizontal: 25,
        paddingTop: 20
    },
    buttonView: {
        paddingBottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonText: {
        width: '80%',
        fontSize: 16,
        fontWeight: '500'
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    }
});

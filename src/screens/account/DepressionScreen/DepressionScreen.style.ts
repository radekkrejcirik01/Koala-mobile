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
    imageContainer: {
        height: 200,
        justifyContent: 'center'
    },
    image: {
        width: 250,
        height: 250,
        alignSelf: 'center'
    },
    messagesContainer: {
        paddingLeft: 25,
        paddingRight: 20,
        paddingTop: 45
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    }
});

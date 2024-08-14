import { StyleSheet } from 'react-native';

export const DepressionScreenStyle = StyleSheet.create({
    container: {
        flexGrow: 1
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

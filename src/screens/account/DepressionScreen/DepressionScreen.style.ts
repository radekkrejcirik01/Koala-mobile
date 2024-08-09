import { StyleSheet } from 'react-native';

export const DepressionScreenStyle = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    scrollView: {
        paddingTop: 20
    },
    image: {
        width: 200,
        height: 200,
        marginVertical: -20,
        alignSelf: 'center'
    },
    messagesContainer: {
        paddingHorizontal: 20,
        paddingTop: 50
    },
    buttonView: {
        marginBottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '500'
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    }
});

import { StyleSheet } from 'react-native';

export const KudosScreenStyle = StyleSheet.create({
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
        width: 180,
        height: 180,
        alignSelf: 'center'
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

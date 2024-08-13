import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const AnxietyAndPanicScreenStyle = StyleSheet.create({
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
    descriptionText: {
        paddingHorizontal: 50,
        color: COLORS.LIGHTGRAY_200,
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: '500'
    },
    line: {
        marginTop: 20,
        marginHorizontal: 20,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: COLORS.LIGHTGRAY
    },
    messagesContainer: {
        paddingHorizontal: 25,
        paddingTop: 15
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    }
});

import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const AnxietyAndPanicScreenStyle = StyleSheet.create({
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
    description: {
        width: '65%',
        marginTop: 10,
        color: COLORS.LIGHTGRAY_200,
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: '500'
    },
    line: {
        marginHorizontal: 25,
        marginTop: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: COLORS.LIGHTGRAY
    },
    messagesContainer: {
        paddingLeft: 25,
        paddingRight: 20,
        paddingTop: 15
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    }
});

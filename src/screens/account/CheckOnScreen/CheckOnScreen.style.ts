import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const CheckOnScreenStyle = StyleSheet.create({
    contentContainer: {
        paddingTop: 10
    },
    questionsContainer: {
        marginTop: '10%',
        paddingHorizontal: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    questionView: {
        margin: 5,
        maxWidth: 170,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 15,
        backgroundColor: COLORS.WHITE_200,
        justifyContent: 'center'
    },
    questionText: {
        textAlign: 'center',
        fontWeight: '600'
    },
    input: {
        marginTop: '15%',
        marginLeft: 25,
        padding: 0, // Overwrite default value
        fontSize: 26,
        color: COLORS.BUTTON_BLUE,
        fontWeight: 'bold'
    },
    send: {
        marginTop: 35,
        marginRight: 20,
        alignSelf: 'flex-end',
        justifyContent: 'center'
    }
});

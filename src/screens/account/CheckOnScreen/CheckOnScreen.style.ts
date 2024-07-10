import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const CheckOnScreenStyle = StyleSheet.create({
    contentContainer: {
        paddingTop: 10
    },
    questionsContainer: {
        marginTop: '10%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    questionView: {
        margin: 5,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 25,
        backgroundColor: COLORS.WHITE_200
    },
    questionText: {
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

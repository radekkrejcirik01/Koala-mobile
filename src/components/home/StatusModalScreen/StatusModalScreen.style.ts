import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const StatusModalScreenStyle = StyleSheet.create({
    container: {
        minHeight: '50%',
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.WHITE
    },
    titleText: {
        marginTop: 20,
        fontSize: 24,
        color: COLORS.BLACK,
        fontWeight: 'bold'
    },
    descriptionText: {
        marginTop: 5,
        fontSize: 12
    },
    expressionsContainer: {
        marginVertical: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    expressionButtonView: {
        margin: 20,
        padding: 15,
        backgroundColor: 'whitesmoke'
    },
    expressionButtonText: {
        fontSize: 30
    },
    clearStatusButtonView: {
        alignSelf: 'center'
    },
    clearStatusButtonText: {
        color: COLORS.BUTTON_BLUE,
        fontWeight: '500'
    }
});

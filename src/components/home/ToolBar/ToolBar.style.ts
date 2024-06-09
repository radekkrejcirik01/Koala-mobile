import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ToolBarStyle = StyleSheet.create({
    scrollView: {
        marginTop: 15
    },
    scrollViewContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    buttonContainer: {
        alignItems: 'center'
    },
    button: {
        width: 65,
        height: 65,
        borderRadius: 50,
        backgroundColor: '#00000010',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTitle: {
        marginTop: 2,
        color: COLORS.BUTTON_BLUE,
        fontWeight: '500'
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    }
});

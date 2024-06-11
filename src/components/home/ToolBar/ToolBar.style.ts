import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ToolBarStyle = StyleSheet.create({
    scrollView: {
        marginTop: 20
    },
    scrollViewContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    button: {
        width: 65,
        height: 65,
        borderRadius: 50,
        backgroundColor: COLORS.WHITE_200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    }
});

import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const StatusesStyle = StyleSheet.create({
    container: {
        marginTop: 25
    },
    titleText: {
        marginLeft: 20,
        fontSize: 22,
        color: COLORS.LIGHTGRAY_100,
        fontWeight: 'bold'
    },
    scrollView: {
        marginTop: 20,
        paddingLeft: 20
    },
    statusButtonView: {
        width: 65,
        height: 65,
        borderRadius: 50,
        backgroundColor: '#00000010',
        alignItems: 'center',
        justifyContent: 'center'
    },
    statusButtonText: {
        fontSize: 16,
        color: COLORS.BUTTON_BLUE,
        fontWeight: '500'
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    }
});

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
    addStatusButton: {
        width: 65,
        height: 65,
        borderRadius: 50,
        backgroundColor: '#00000010',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    }
});

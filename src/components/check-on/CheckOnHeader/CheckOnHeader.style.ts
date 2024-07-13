import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const CheckOnHeaderStyle = StyleSheet.create({
    container: {
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 26,
        color: COLORS.LIGHTGRAY_200,
        fontWeight: 'bold'
    },
    buttonText: {
        color: COLORS.PURPLE,
        fontWeight: 'bold'
    }
});

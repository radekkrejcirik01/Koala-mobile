import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const CheckOnHeaderStyle = StyleSheet.create({
    container: {
        marginLeft: 25,
        marginRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 26,
        color: COLORS.LIGHTGRAY_200,
        fontWeight: 'bold'
    },
    buttonText: {
        color: COLORS.PURPLE,
        fontWeight: 'bold'
    }
});

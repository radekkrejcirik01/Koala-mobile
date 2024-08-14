import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const CheckOnHeaderStyle = StyleSheet.create({
    container: {
        paddingTop: 45,
        paddingLeft: 20,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        color: COLORS.BLACK_75,
        fontWeight: 'bold'
    }
});

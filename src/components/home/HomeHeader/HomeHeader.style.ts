import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeHeaderStyle = StyleSheet.create({
    container: {
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 26,
        color: COLORS.LIGHTGRAY_200,
        fontWeight: 'bold'
    }
});

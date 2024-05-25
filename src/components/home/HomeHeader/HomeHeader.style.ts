import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeHeaderStyle = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    greetingText: {
        fontSize: 22,
        color: COLORS.LIGHTGRAY_100,
        fontWeight: 'bold'
    },
    nameText: {
        fontSize: 32,
        color: COLORS.LIGHTGRAY_100,
        fontWeight: 'bold'
    }
});

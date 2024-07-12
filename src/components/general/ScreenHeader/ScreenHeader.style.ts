import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ScreenHeaderStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleText: {
        fontSize: 24,
        color: COLORS.LIGHTGRAY_200,
        fontWeight: 'bold'
    }
});

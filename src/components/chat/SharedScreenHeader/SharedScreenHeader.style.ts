import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const SharedScreenHeaderStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleText: {
        marginLeft: 10,
        fontSize: 24,
        color: COLORS.BLACK,
        fontWeight: '600'
    }
});

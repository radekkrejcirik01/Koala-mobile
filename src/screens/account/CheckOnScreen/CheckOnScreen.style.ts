import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const CheckOnScreenStyle = StyleSheet.create({
    contentContainer: {
        paddingLeft: 15,
        paddingBottom: 10,
        paddingRight: 20
    },
    titleText: {
        fontSize: 24,
        color: COLORS.LIGHTGRAY_100,
        fontWeight: 'bold',
        alignSelf: 'flex-end'
    }
});

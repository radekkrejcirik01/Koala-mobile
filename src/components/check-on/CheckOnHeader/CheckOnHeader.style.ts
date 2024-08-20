import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const CheckOnHeaderStyle = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        flexDirection: 'row'
    },
    flex: {
        flex: 1
    },
    titleText: {
        fontSize: 16,
        color: COLORS.BLACK_75,
        fontWeight: 'bold'
    }
});

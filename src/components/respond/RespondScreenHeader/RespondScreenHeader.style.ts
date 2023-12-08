import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const RespondScreenHeaderStyle = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        paddingBottom: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    contentContainer: {
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameText: {
        marginLeft: 8,
        fontSize: 18,
        color: COLORS.BLACK,
        fontWeight: 'bold'
    }
});

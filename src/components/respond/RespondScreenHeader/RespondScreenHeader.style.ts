import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const RespondScreenHeaderStyle = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameContainer: {
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameText: {
        marginLeft: 8,
        fontSize: 20,
        color: COLORS.BLACK_50,
        fontWeight: 'bold'
    }
});

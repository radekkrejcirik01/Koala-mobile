import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const RespondScreenHeaderStyle = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingHorizontal: 10,
        paddingBottom: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameContainer: {
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameText: {
        marginLeft: 6,
        fontSize: 18,
        color: COLORS.BLACK_50,
        fontWeight: 'bold'
    }
});

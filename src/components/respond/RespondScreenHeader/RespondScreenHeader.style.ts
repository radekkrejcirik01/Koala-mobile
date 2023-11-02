import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const RespondScreenHeaderStyle = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    backContainer: {
        flex: 1
    },
    nameContainer: {
        flex: 1,
        alignItems: 'center'
    },
    nameText: {
        fontSize: 22,
        color: COLORS.BLACK_50,
        fontWeight: 'bold'
    },
    profileContainer: {
        flex: 1,
        alignItems: 'flex-end'
    }
});

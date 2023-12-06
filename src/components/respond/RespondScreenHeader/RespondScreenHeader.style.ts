import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const RespondScreenHeaderStyle = StyleSheet.create({
    container: {
        paddingTop: 5,
        paddingHorizontal: 10,
        paddingBottom: 4,
        borderBottomWidth: 0.4,
        borderBottomColor: COLORS.LIGHTGRAY,
        flexDirection: 'row',
        alignItems: 'center'
    },
    contentContainer: {
        marginLeft: 10,
        flexDirection: 'row'
    },
    nameContainer: {
        marginLeft: 6
    },
    nameText: {
        fontSize: 16,
        color: COLORS.BLACK_50,
        fontWeight: 'bold'
    },
    usernameText: {
        color: COLORS.GRAY_200,
        fontWeight: 'bold'
    }
});

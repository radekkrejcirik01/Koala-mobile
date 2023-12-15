import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const RespondScreenHeaderStyle = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        paddingBottom: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    centerRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    contentContainer: {
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameText: {
        marginLeft: 8,
        fontSize: 18,
        color: COLORS.BLACK,
        fontWeight: '600'
    },
    sharedButtonView: {
        marginRight: 10,
        marginBottom: 5
    }
});

import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ProfileModalScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.WHITE,
        alignItems: 'center'
    },
    nameText: {
        marginTop: 10,
        fontSize: 25,
        fontWeight: 'bold'
    },
    historyView: {
        flex: 1,
        width: '100%',
        paddingTop: 20,
        paddingHorizontal: 15
    },
    historyTitleText: {
        fontWeight: 'bold'
    },
    historyListContainer: {
        paddingTop: 10,
        paddingBottom: 50
    }
});

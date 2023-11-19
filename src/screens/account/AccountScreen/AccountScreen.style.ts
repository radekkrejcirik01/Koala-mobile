import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const AccountScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 20
    },
    contentContainer: {
        flex: 1,
        paddingVertical: 25,
        justifyContent: 'space-between'
    },
    buttonView: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.WHITE
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    descriptionText: {
        marginLeft: 10,
        color: COLORS.GRAY_200
    }
});

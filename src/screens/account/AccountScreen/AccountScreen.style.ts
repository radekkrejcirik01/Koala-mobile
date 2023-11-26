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
        paddingTop: 25,
        paddingBottom: 25,
        justifyContent: 'space-between'
    },
    buttonView: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'whitesmoke'
    },
    buttonText: {
        fontSize: 16,
        color: COLORS.BLACK_50,
        fontWeight: '600'
    },
    descriptionText: {
        marginTop: 5,
        marginHorizontal: 15,
        color: COLORS.GRAY_200
    }
});

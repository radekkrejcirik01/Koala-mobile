import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const NotificationItemStyle = StyleSheet.create({
    container: {
        marginVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row'
    },
    paddingLeft: {
        paddingLeft: 8
    },
    titleText: {
        fontWeight: '500'
    },
    likeButtonView: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.WHITE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fontSize22: {
        fontSize: 22
    },
    fontSize16: {
        fontSize: 16
    }
});

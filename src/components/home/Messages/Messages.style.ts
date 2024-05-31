import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const MessagesStyle = StyleSheet.create({
    container: {
        paddingTop: 35,
        alignItems: 'center'
    },
    titleText: {
        fontSize: 26,
        color: COLORS.BUTTON_BLUE,
        fontWeight: 'bold'
    },
    contentView: {
        paddingTop: 15,
        paddingHorizontal: 22,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    buttonView: {
        margin: 5,
        maxHeight: 60,
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 25,
        backgroundColor: '#00000010'
    },
    buttonText: {
        fontSize: 15,
        color: COLORS.BLACK_50,
        fontWeight: '500'
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    }
});

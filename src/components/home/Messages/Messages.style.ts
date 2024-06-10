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
        paddingTop: 20,
        paddingHorizontal: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    buttonView: {
        margin: 5,
        maxHeight: 60,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 25,
        backgroundColor: COLORS.WHITE_200
    },
    buttonText: {
        fontSize: 15,
        color: COLORS.BLACK,
        fontWeight: '500'
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    }
});

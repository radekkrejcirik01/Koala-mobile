import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const MessagesStyle = StyleSheet.create({
    scrollView: {
        paddingTop: 25
    },
    scrollViewContainer: {
        paddingBottom: 120,
        alignItems: 'center'
    },
    contentView: {
        paddingHorizontal: 15,
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
        fontSize: 16,
        color: COLORS.BLACK,
        fontWeight: '500'
    },
    directEmotionButtonView: {
        marginTop: 35,
        flexDirection: 'row'
    },
    directEmotionText: {
        fontSize: 15,
        color: COLORS.BUTTON_BLUE,
        fontWeight: '600'
    },
    directIcon: {
        marginLeft: 5
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    }
});

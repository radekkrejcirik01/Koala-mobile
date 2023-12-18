import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeScreenStyle = StyleSheet.create({
    container: {
        flex: 1
    },
    expressionsScrollView: {
        marginTop: 15,
        paddingLeft: 20,
        flexDirection: 'row'
    },
    statusButtonView: {
        width: 75,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#00000010',
        alignItems: 'center',
        alignSelf: 'flex-start'
    },
    statusButtonText: {
        fontSize: 16,
        color: COLORS.BLACK,
        fontWeight: '500'
    },
    friendStatusButtonView: {
        marginLeft: 5,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: '#00000010',
        alignSelf: 'flex-start'
    },
    scrollView: {
        paddingTop: 60
    },
    scrollViewContainer: {
        paddingBottom: 120,
        alignItems: 'center'
    },
    contentView: {
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
        marginTop: 50,
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

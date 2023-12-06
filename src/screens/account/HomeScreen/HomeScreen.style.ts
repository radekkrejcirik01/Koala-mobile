import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    scrollViewContainer: {
        flexGrow: 1,
        paddingBottom: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollView: {
        marginBottom: 10,
        paddingTop: 50
    },
    contentView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    buttonView: {
        margin: 4,
        maxHeight: 60,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 2.5,
        borderRadius: 25,
        borderColor: COLORS.LIGHTGRAY
    },
    buttonText: {
        fontSize: 16,
        color: COLORS.BLACK_50,
        fontWeight: '600'
    },
    directEmotionButtonView: {
        marginTop: 20,
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
    friendsButtonView: {
        height: 45,
        marginHorizontal: 5,
        borderRadius: 10,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    friendsButtonText: {
        fontSize: 16,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    }
});

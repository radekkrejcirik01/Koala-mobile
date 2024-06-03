import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const CheckOnScreenStyle = StyleSheet.create({
    contentContainer: {
        paddingTop: '35%',
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    titleText: {
        fontSize: 26,
        color: COLORS.LIGHTGRAY_100,
        fontWeight: 'bold',
        alignSelf: 'flex-end'
    },
    descriptionText: {
        marginTop: 2,
        color: COLORS.LIGHTGRAY_100,
        alignSelf: 'flex-end',
        fontWeight: 'bold'
    },
    input: {
        marginTop: 35,
        marginLeft: 10,
        padding: 0, // Overwrite default value
        fontSize: 26,
        color: COLORS.BUTTON_BLUE,
        fontWeight: 'bold'
    },
    sendContainer: {
        marginTop: 35,
        alignSelf: 'flex-end',
        justifyContent: 'center'
    },
    selectView: {
        maxWidth: 150,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    addFriendButton: {
        margin: 4,
        marginTop: 8
    },
    sendButtonView: {
        width: 110,
        height: 45,
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 18,
        backgroundColor: COLORS.BUTTON_BLUE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sendButtonText: {
        fontSize: 20,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});

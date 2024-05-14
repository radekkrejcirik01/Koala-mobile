import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ShareModalScreenStyle = StyleSheet.create({
    container: {
        minHeight: '50%',
        paddingTop: 20,
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.WHITE
    },
    messageText: {
        fontSize: 24,
        color: COLORS.BLACK,
        fontWeight: 'bold'
    },
    content: {
        flexGrow: 1,
        paddingTop: 25,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    sendContainer: {
        width: '45%',
        paddingBottom: 50,
        alignItems: 'center',
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
    }
});

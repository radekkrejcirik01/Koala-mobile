import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatHeaderStyle = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    centerRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    contentContainer: {
        marginLeft: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    acronym: {
        borderRadius: 18
    },
    namesView: {
        marginLeft: 8,
        marginBottom: 2
    },
    nameText: {
        fontSize: 16,
        color: COLORS.BLACK,
        fontWeight: '600'
    },
    usernameText: {
        fontSize: 12,
        color: COLORS.GRAY_200
    },
    sharedButtonView: {
        marginRight: 5,
        marginBottom: 5
    },
    chatEmoji: {
        fontSize: 20,
        color: COLORS.BLACK
    }
});

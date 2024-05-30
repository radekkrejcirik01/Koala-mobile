import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatHeaderStyle = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingBottom: 5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: COLORS.LIGHTGRAY,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    centerRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    contentContainer: {
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    acronym: {
        borderRadius: 19
    },
    namesView: {
        marginLeft: 8
    },
    nameText: {
        fontSize: 17,
        color: COLORS.BLACK,
        fontWeight: '600'
    },
    usernameText: {
        fontSize: 12,
        color: COLORS.GRAY_200
    },
    sharedButtonView: {
        marginBottom: 5
    }
});

import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const DirectSharingModalScreenStyle = StyleSheet.create({
    container: {
        minHeight: '48%',
        paddingTop: 20,
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.WHITE,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputView: {
        flex: 1
    },
    input: {
        fontSize: 20,
        color: COLORS.BLACK,
        textAlignVertical: 'top',
        fontWeight: 'bold'
    },
    sendContainer: {
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

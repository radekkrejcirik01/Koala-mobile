import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const RecordingInputStyle = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 44,
        marginLeft: 6,
        marginRight: 4,
        paddingVertical: 4,
        paddingHorizontal: 14,
        borderRadius: 20,
        backgroundColor: 'whitesmoke',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    centerRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    sendButtonView: {
        padding: 5,
        borderRadius: 20,
        backgroundColor: COLORS.BUTTON_BLUE
    },
    sendButtonIcon: {
        right: -1
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

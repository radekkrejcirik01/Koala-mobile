import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const RepliesStyle = StyleSheet.create({
    scrollView: {
        backgroundColor: COLORS.WHITE
    },
    container: {
        paddingHorizontal: 50,
        paddingBottom: 25,
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    buttonView: {
        minWidth: 70,
        marginVertical: 4,
        marginHorizontal: 2,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#00000010',
        alignItems: 'center'
    },
    buttonText: {
        color: COLORS.BLACK_50,
        fontWeight: '500'
    },
    addView: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
        alignSelf: 'center'
    },
    addText: {
        color: COLORS.PURPLE
    },
    activityIndicator: {
        marginBottom: 100
    }
});

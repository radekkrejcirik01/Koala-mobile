import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const PrivacyPolicyScreenStyle = StyleSheet.create({
    contentContainer: {
        paddingTop: 10,
        paddingHorizontal: 10,
        paddingBottom: 100
    },
    title: {
        marginTop: 10,
        fontSize: 18,
        color: COLORS.BLACK,
        fontWeight: 'bold'
    },
    description: {
        marginTop: 10,
        fontSize: 16,
        color: COLORS.BLACK
    }
});

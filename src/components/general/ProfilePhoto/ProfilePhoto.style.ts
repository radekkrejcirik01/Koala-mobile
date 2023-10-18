import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ProfilePhotoStyle = StyleSheet.create({
    container: {
        borderRadius: 40
    },
    image: {
        borderRadius: 40
    },
    acronymView: {
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    acronymText: {
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
});

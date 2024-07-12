import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ProfileHeaderStyle = StyleSheet.create({
    container: {
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        height: 30,
        width: 30
    },
    titleText: {
        marginLeft: 10,
        fontSize: 26,
        color: COLORS.LIGHTGRAY_200,
        fontWeight: 'bold'
    }
});

import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const MessagesStyle = StyleSheet.create({
    titleText: {
        marginTop: 30,
        marginLeft: 20,
        fontSize: 18,
        color: COLORS.PURPLE,
        fontWeight: 'bold'
    },
    itemsContainer: {
        paddingTop: 15,
        paddingLeft: 20,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    anxietyImage: {
        width: 40,
        height: 40,
        alignSelf: 'flex-end'
    },
    depressionImage: {
        width: 55,
        height: 55,
        alignSelf: 'flex-end'
    },
    wellbeingImage: {
        width: 45,
        height: 45,
        alignSelf: 'flex-end'
    },
    kudosImage: {
        width: 40,
        height: 40,
        marginBottom: 5,
        alignSelf: 'flex-end'
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    }
});

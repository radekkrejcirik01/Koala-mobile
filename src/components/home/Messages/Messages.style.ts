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
    cardView: {
        width: '90%',
        height: 150,
        marginTop: 15,
        padding: 15,
        borderRadius: 20,
        backgroundColor: COLORS.WHITE_200,
        alignSelf: 'center',
        justifyContent: 'space-between'
    },
    cardText: {
        fontSize: 24,
        color: COLORS.BLACK_75,
        fontWeight: 'bold'
    },
    cardButton: {
        width: 65,
        height: 65,
        marginRight: 5,
        borderRadius: 50,
        backgroundColor: COLORS.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end'
    },
    cardButtonText: {
        fontSize: 26
    },
    itemsContainer: {
        paddingTop: 15,
        paddingLeft: 20,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    buttonView: {
        width: '45%',
        height: 80,
        marginRight: 15,
        marginBottom: 20,
        padding: 12,
        borderRadius: 15,
        backgroundColor: COLORS.WHITE_200
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.BLACK_75
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    }
});

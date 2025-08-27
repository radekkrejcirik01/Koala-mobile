import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const MessagesStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    marginBottom: 60
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.LIGHTGRAY_100,
    alignSelf: 'center'
  },
  itemsContainer: {
    justifyContent: 'center',
    paddingTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  messagesView: {
    height: 300,
    width: '45%',
    marginRight: 20,
    borderRadius: 20,
    backgroundColor: COLORS.WHITE_200
  },
  directView: {
    width: 140,
    height: 140,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: COLORS.WHITE_200
  },
  voiceView: {
    width: 140,
    height: 140,
    borderRadius: 20,
    backgroundColor: COLORS.WHITE_200
  },
  footerContainer: {
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  friendsView: {
    width: 100,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  friendsText: {
    fontWeight: 'bold',
    color: COLORS.LIGHTGRAY_200
  },
  profileView: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  profileText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.BLACK
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end'
  }
});

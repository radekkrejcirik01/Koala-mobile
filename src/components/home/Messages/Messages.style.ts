import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const MessagesStyle = StyleSheet.create({
  container: {
    marginBottom: 60
  },
  title: {
    fontSize: 28,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  itemsContainer: {
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  },
  messagesView: {
    padding: 20,
    height: 300,
    width: '43%',
    borderRadius: 20,
    backgroundColor: COLORS.PASTEL_PURPLE,
    justifyContent: 'space-between'
  },
  rightViewsContainer: {
    width: '42%'
  },
  directView: {
    padding: 20,
    height: 140,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: COLORS.PASTEL_BLUE
  },
  voiceView: {
    padding: 20,
    height: 140,
    borderRadius: 20,
    backgroundColor: COLORS.PASTEL_YELLOW
  },
  emojiView: {
    padding: 7,
    borderRadius: 20,
    backgroundColor: COLORS.WHITE_100,
    alignSelf: 'flex-start'
  },
  emojiText: {
    fontSize: 24,
    color: COLORS.BLACK
  },
  viewText: {
    marginTop: 5,
    fontSize: 16,
    color: COLORS.BLACK,
    fontWeight: '600'
  },
  footerContainer: {
    paddingTop: 30,
    paddingHorizontal: 30,
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
    color: COLORS.LIGHTGRAY_100,
    fontWeight: 'bold'
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

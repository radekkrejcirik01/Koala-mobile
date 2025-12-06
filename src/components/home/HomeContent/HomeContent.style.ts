import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeContentStyle = StyleSheet.create({
  container: {
    paddingBottom: '10%'
  },
  helperView: {
    height: 200
  },
  itemsContainer: {
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  },
  messagesView: {
    padding: 18,
    paddingBottom: 30,
    height: 305,
    width: '43%',
    borderRadius: 20,
    justifyContent: 'space-between'
  },
  rightViewsContainer: {
    width: '40%'
  },
  directView: {
    padding: 18,
    height: 140,
    marginBottom: 25,
    borderRadius: 20
  },
  voiceView: {
    padding: 18,
    height: 140,
    borderRadius: 20
  },
  emojiView: {
    alignSelf: 'flex-start'
  },
  emojiText: {
    fontSize: 32,
    color: COLORS.BLACK
  },
  viewText: {
    marginTop: 8,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '700'
  },
  footerContainer: {
    paddingTop: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bottomButtonView: {
    width: 110,
    height: 55,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  bottomButtonText: {
    color: COLORS.GRAY_200,
    fontSize: 16,
    fontWeight: 'bold'
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end'
  }
});

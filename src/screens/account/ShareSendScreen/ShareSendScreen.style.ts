import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ShareSendScreenStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  listView: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20
  },
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listEmptyText: {
    marginHorizontal: 40,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.GRAY_200
  },
  sendButtonView: {
    paddingHorizontal: 30,
    marginBottom: 30
  },
  // Same look as HomeButton, but full width
  sendButton: {
    height: 52,
    borderRadius: 70,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  sendButtonText: {
    color: COLORS.BLACK,
    fontSize: 16,
    fontWeight: 'bold'
  }
});

import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  chatView: {
    flex: 1
  },
  // Opened at an older message, goes back to the newest ones
  latestButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3
  },
  latestText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.BLACK
  }
});

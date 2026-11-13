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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 30,
    marginBottom: 30
  },
  infoText: {
    flex: 1,
    paddingRight: 20,
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.GRAY_200
  }
});

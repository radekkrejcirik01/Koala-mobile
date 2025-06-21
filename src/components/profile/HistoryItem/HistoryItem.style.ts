import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HistoryItemStyle = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row'
  },
  textsView: {
    flex: 1
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  messageText: {
    flex: 1,
    marginRight: 20,
    fontSize: 16,
    color: COLORS.BLACK,
    fontWeight: '600'
  },
  timeText: {
    color: COLORS.GRAY_200
  },
  sharedToText: {
    fontSize: 15,
    color: COLORS.GRAY_200,
    fontWeight: '500'
  }
});

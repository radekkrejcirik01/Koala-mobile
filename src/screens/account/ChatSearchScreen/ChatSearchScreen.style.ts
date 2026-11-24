import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatSearchScreenStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  inputView: {
    height: 44,
    marginHorizontal: 16,
    marginBottom: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputIcon: {
    fontSize: 15,
    marginRight: 8
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16
  },
  resultView: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.WHITE_300
  },
  resultContent: {
    flex: 1
  },
  resultTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2
  },
  senderText: {
    fontSize: 14,
    fontWeight: '600'
  },
  timeText: {
    fontSize: 13,
    color: COLORS.GRAY_200
  },
  messageText: {
    fontSize: 15,
    color: COLORS.LIGHTGRAY_200
  },
  matchText: {
    fontWeight: '700',
    color: COLORS.BUTTON_BLUE
  },
  loader: {
    marginLeft: 10
  },
  emptyText: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 15,
    color: COLORS.GRAY_200
  }
});

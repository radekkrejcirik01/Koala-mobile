import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';
import { createStyles } from '@utils/general/createStyles';

export const useChatSearchScreenStyle = createStyles((colors) => ({
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
    color: colors.text,
    fontSize: 15,
    marginRight: 8
  },
  input: {
    color: colors.text,
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
    borderBottomColor: colors.surface_300
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
    color: colors.text,
    fontSize: 14,
    fontWeight: '600'
  },
  timeText: {
    fontSize: 13,
    color: colors.textSecondary
  },
  messageText: {
    fontSize: 15,
    color: colors.textTertiary
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
    color: colors.textSecondary
  }
}));

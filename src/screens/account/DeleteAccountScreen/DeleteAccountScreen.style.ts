import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';
import { createStyles } from '@utils/general/createStyles';

export const useDeleteAccountScreenStyle = createStyles((colors) => ({
  container: {
    flex: 1
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14
  },
  iconView: {
    width: 32,
    height: 32,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface_200
  },
  icon: {
    color: colors.text,
    fontSize: 17
  },
  content: {
    flex: 1,
    marginLeft: 12,
    paddingVertical: 12,
    paddingRight: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.surface_300
  },
  noBorder: {
    borderBottomWidth: 0
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500'
  },
  description: {
    marginTop: 2,
    fontSize: 14,
    lineHeight: 19,
    color: colors.textTertiary
  },
  button: {
    width: 'auto',
    height: 50,
    marginTop: 30,
    marginHorizontal: 16,
    borderRadius: 14,
    backgroundColor: COLORS.NOTIFICATION_DOT
  }
}));

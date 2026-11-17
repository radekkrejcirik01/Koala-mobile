import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const DeleteAccountScreenStyle = StyleSheet.create({
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
    backgroundColor: COLORS.WHITE_200
  },
  icon: {
    color: COLORS.BLACK,
    fontSize: 17
  },
  content: {
    flex: 1,
    marginLeft: 12,
    paddingVertical: 12,
    paddingRight: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.WHITE_300
  },
  noBorder: {
    borderBottomWidth: 0
  },
  title: {
    fontSize: 16,
    fontWeight: '500'
  },
  description: {
    marginTop: 2,
    fontSize: 14,
    lineHeight: 19,
    color: COLORS.LIGHTGRAY_200
  },
  button: {
    width: 'auto',
    height: 50,
    marginTop: 30,
    marginHorizontal: 16,
    borderRadius: 14,
    backgroundColor: COLORS.NOTIFICATION_DOT
  }
});

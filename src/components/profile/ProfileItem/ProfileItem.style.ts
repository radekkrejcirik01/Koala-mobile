import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ProfileItemStyle = StyleSheet.create({
  view: {
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
    fontSize: 17
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 12,
    paddingVertical: 15,
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
  chevron: {
    opacity: 0.4,
    transform: [{ rotate: '180deg' }]
  }
});

import { StyleSheet } from 'react-native';
import { createStyles } from '@utils/general/createStyles';

export const useProfileItemStyle = createStyles((colors) => ({
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
    backgroundColor: colors.surface_200
  },
  icon: {
    color: colors.text,
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
  value: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
    textAlign: 'right',
    fontSize: 15,
    color: colors.textTertiary
  },
  chevron: {
    opacity: 0.4,
    transform: [{ rotate: '180deg' }]
  }
}));

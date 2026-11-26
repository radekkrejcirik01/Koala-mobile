import { createStyles } from '@utils/general/createStyles';

export const usePasswordStrengthStyle = createStyles((colors) => ({
  container: {
    marginTop: 12,
    marginHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  bars: {
    flex: 1,
    flexDirection: 'row',
    gap: 6
  },
  bar: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.surface_200
  },
  label: {
    color: colors.text,
    width: 70,
    marginLeft: 12,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right'
  }
}));

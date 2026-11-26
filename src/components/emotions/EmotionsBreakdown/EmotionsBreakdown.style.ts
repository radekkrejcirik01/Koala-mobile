import { createStyles } from '@utils/general/createStyles';

export const useEmotionsBreakdownStyle = createStyles((colors) => ({
  row: {
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center'
  },
  emojiText: {
    color: colors.text,
    width: 30,
    fontSize: 20
  },
  labelText: {
    color: colors.text,
    width: 80,
    fontSize: 14,
    fontWeight: '600'
  },
  track: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: colors.surface_200
  },
  fill: {
    height: '100%',
    borderRadius: 4
  },
  countText: {
    color: colors.text,
    width: 44,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '600'
  },
  zero: {
    opacity: 0.4
  }
}));

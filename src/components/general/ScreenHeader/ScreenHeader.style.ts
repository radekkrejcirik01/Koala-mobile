import { createStyles } from '@utils/general/createStyles';

export const useScreenHeaderStyle = createStyles((colors) => ({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row'
  },
  flex: {
    flex: 1
  },
  titleText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold'
  },
  closeText: {
    color: colors.textTertiary,
    fontWeight: 'bold'
  }
}));

import { createStyles } from '@utils/general/createStyles';

export const useBackButtonStyle = createStyles((colors) => ({
  container: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23,
    marginLeft: 5,
    backgroundColor: colors.surface_200
  },
  icon: {
    marginRight: 2
  }
}));

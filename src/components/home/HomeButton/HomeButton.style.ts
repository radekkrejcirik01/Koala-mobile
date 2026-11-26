import { createStyles } from '@utils/general/createStyles';

export const useHomeButtonStyle = createStyles((colors) => ({
  container: {
    width: 110,
    height: 52,
    borderRadius: 70,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  text: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold'
  }
}));

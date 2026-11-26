import { createStyles } from '@utils/general/createStyles';

export const useAndroidPromptStyle = createStyles((colors) => ({
  container: {
    width: '80%',
    height: 160,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderRadius: 20,
    backgroundColor: colors.card,
    alignSelf: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500'
  },
  input: {
    width: '100%',
    height: 35,
    marginTop: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: colors.text,
    backgroundColor: colors.surface_200
  },
  buttonsView: {
    width: 175,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modal: {
    margin: 0
  }
}));

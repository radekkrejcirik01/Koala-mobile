import { createStyles } from '@utils/general/createStyles';

export const useFeedbackScreenStyle = createStyles((colors) => ({
  container: {
    flex: 1
  },
  contentContainer: {
    paddingBottom: 30
  },
  input: {
    color: colors.text,
    minHeight: 150,
    padding: 14,
    paddingTop: 14,
    fontSize: 16,
    textAlignVertical: 'top'
  },
  button: {
    alignItems: 'stretch'
  },
  thankText: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary
  }
}));

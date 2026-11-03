import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const SupportScreenStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    paddingBottom: 30
  },
  input: {
    minHeight: 150,
    padding: 14,
    paddingTop: 14,
    fontSize: 16,
    textAlignVertical: 'top'
  },
  emailInput: {
    height: 50,
    paddingHorizontal: 14,
    fontSize: 16
  },
  button: {
    alignItems: 'stretch'
  },
  thankText: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.GRAY_200
  }
});

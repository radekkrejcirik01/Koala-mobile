import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const AuthInputStyle = StyleSheet.create({
  container: {
    marginTop: 12
  },
  field: {
    height: 52,
    paddingHorizontal: 16,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontWeight: '500'
  },
  toggle: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.BUTTON_BLUE
  },
  message: {
    marginTop: 10,
    marginLeft: 4,
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.LIGHTGRAY_200
  },
  errorMessage: {
    color: COLORS.EMOTION_MISERABLE
  }
});

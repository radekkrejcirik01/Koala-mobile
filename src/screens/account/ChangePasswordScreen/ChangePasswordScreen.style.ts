import { StyleSheet } from 'react-native';
import { createStyles } from '@utils/general/createStyles';

export const useChangePasswordScreenStyle = createStyles((colors) => ({
  container: {
    flex: 1
  },
  input: {
    color: colors.text,
    height: 50,
    paddingHorizontal: 14,
    fontSize: 16,
    fontWeight: '500'
  },
  separator: {
    marginLeft: 14,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.surface_300
  },
  button: {
    width: 'auto',
    height: 50,
    marginTop: 30,
    marginHorizontal: 16,
    borderRadius: 14
  }
}));

import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ProfileSectionStyle = StyleSheet.create({
  container: {
    marginTop: 26
  },
  title: {
    marginBottom: 8,
    marginHorizontal: 30,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: COLORS.GRAY_200
  },
  card: {
    marginHorizontal: 16,
    borderRadius: 14,
    overflow: 'hidden'
  },
  footer: {
    marginTop: 8,
    marginHorizontal: 30,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.GRAY_200
  }
});

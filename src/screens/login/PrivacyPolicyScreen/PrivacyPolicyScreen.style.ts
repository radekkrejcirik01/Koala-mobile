import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const PrivacyPolicyScreenStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    paddingTop: 10,
    paddingHorizontal: 24
  },
  title: {
    fontSize: 28,
    fontWeight: '800'
  },
  effectiveDate: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.LIGHTGRAY_200
  },
  sectionTitle: {
    marginTop: 28,
    fontSize: 18,
    fontWeight: '700'
  },
  subsectionTitle: {
    marginTop: 16,
    fontSize: 15,
    fontWeight: '700'
  },
  paragraph: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.LIGHTGRAY_200
  }
});

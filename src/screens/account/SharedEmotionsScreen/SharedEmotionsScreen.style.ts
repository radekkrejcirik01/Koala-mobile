import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const SharedEmotionsScreenStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 8
  },
  card: {
    marginTop: 16,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 18,
    backgroundColor: COLORS.WHITE_200
  },
  totalText: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  totalLabelText: {
    marginBottom: 16,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.GRAY_200
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 6,
    marginHorizontal: 20,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: COLORS.GRAY_200
  },
  stale: {
    opacity: 0.5
  },
  activityIndicator: {
    marginTop: 40
  },
  listEmptyText: {
    marginTop: 30,
    marginHorizontal: 40,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.GRAY_200
  }
});

import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const PeriodSelectorStyle = StyleSheet.create({
  container: {
    marginHorizontal: 20
  },
  segmentedView: {
    padding: 3,
    borderRadius: 12,
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE_200
  },
  segment: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center'
  },
  segmentActive: {
    backgroundColor: COLORS.WHITE,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.GRAY_200
  },
  segmentTextActive: {
    color: COLORS.BLACK
  },
  navigationView: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  arrowText: {
    paddingHorizontal: 10,
    fontSize: 26,
    fontWeight: '500',
    color: COLORS.BLACK
  },
  arrowTextDisabled: {
    color: COLORS.LIGHTGRAY
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

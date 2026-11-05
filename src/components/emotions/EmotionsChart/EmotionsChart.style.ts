import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const CHART_HEIGHT = 140;

export const EmotionsChartStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  column: {
    flex: 1,
    alignItems: 'center'
  },
  barArea: {
    width: '100%',
    height: CHART_HEIGHT,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  bar: {
    width: '70%',
    maxWidth: 28,
    borderRadius: 4,
    overflow: 'hidden',
    flexDirection: 'column-reverse'
  },
  emptyBar: {
    width: '70%',
    maxWidth: 28,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.WHITE_200
  },
  countText: {
    marginBottom: 3,
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.GRAY_200
  },
  labelText: {
    marginTop: 6,
    height: 14,
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.GRAY_200
  }
});

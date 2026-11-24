import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ChatMoodScreenStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 8
  },
  subtitleText: {
    marginHorizontal: 20,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.GRAY_200
  },
  card: {
    marginTop: 16,
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 18,
    backgroundColor: COLORS.WHITE_200
  },
  weekRow: {
    flexDirection: 'row'
  },
  weekdayText: {
    width: `${100 / 7}%`,
    marginBottom: 6,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.GRAY_200
  },
  daysView: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    padding: 3
  },
  day: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.TRANSPARENT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE_200
  },
  daySelected: {
    borderColor: COLORS.BUTTON_BLUE
  },
  dayEmoji: {
    fontSize: 18
  },
  dayNumber: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.GRAY_200
  },
  todayNumber: {
    fontWeight: '800',
    color: COLORS.BLACK
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
  listEmptyText: {
    marginTop: 30,
    marginHorizontal: 40,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.GRAY_200
  }
});

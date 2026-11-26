import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';
import { createStyles } from '@utils/general/createStyles';

export const useAuthLayoutStyle = createStyles((colors) => ({
  container: {
    flex: 1
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  // Keeps the header height of the hidden back button
  backSpacer: {
    height: 46
  },
  headerTitleView: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold'
  },
  progress: {
    flex: 1,
    marginLeft: 16,
    marginRight: 20,
    flexDirection: 'row',
    gap: 6
  },
  progressSegment: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.surface_200
  },
  progressSegmentActive: {
    backgroundColor: COLORS.BUTTON_BLUE
  },
  stepText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textTertiary
  },
  content: {
    paddingTop: 30,
    paddingHorizontal: 24
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800'
  },
  titleWithoutSubtitle: {
    marginBottom: 14
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    color: colors.textTertiary
  },
  footer: {
    paddingTop: 12,
    paddingHorizontal: 24
  }
}));

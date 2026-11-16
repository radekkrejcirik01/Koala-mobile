import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const AuthLayoutStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerTitleView: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
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
    backgroundColor: COLORS.WHITE_200
  },
  progressSegmentActive: {
    backgroundColor: COLORS.BUTTON_BLUE
  },
  stepText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.LIGHTGRAY_200
  },
  content: {
    paddingTop: 30,
    paddingHorizontal: 24
  },
  title: {
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
    color: COLORS.LIGHTGRAY_200
  },
  footer: {
    paddingTop: 12,
    paddingHorizontal: 24
  }
});

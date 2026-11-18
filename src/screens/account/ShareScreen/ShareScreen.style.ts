import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const ShareScreenStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  mainView: {
    flex: 1
  },
  titleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 20
  },
  contentView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  arrowsView: {
    flexDirection: 'row',
    gap: 48,
    marginBottom: 100
  },
  arrowButton: {
    width: 74,
    height: 74,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 37,
    backgroundColor: COLORS.WHITE_200
  },
  arrowLeftIcon: {
    marginRight: 2
  },
  arrowRightIcon: {
    marginLeft: 2,
    transform: [{ rotate: '180deg' }]
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 40
  },
  messageInput: {
    alignSelf: 'stretch',
    paddingTop: 0,
    paddingBottom: 0
  },
  nextButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 30,
    marginBottom: 30
  },
  messageButton: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 20
  },
  messageButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.BUTTON_BLUE
  }
});

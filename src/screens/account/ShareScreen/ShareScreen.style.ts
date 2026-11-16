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
    paddingHorizontal: 20
  },
  contentView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  emotionsView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 300,
    gap: 24,
    rowGap: 24,
    marginBottom: 210
  },
  selectedEmoji: {
    color: COLORS.BLACK,
    fontSize: 64,
    textAlign: 'center',
    marginBottom: 16
  },
  title: {
    fontSize: 24,
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
  },
  messageButtonTextDisabled: {
    color: COLORS.GRAY_200
  }
});

import { StyleSheet } from 'react-native';

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
  nextButtonView: {
    alignItems: 'flex-end',
    paddingRight: 30,
    marginBottom: 30
  }
});

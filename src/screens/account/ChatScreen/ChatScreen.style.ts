import { StyleSheet } from 'react-native';

export const ChatScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  supportView: {
    flex: 1,
    alignItems: 'center'
  },
  emotionView: {
    alignItems: 'center',
    paddingTop: 60
  },
  emotionText: {
    fontSize: 80,
    textAlign: 'center'
  },
  emotionMessageText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 16
  },
  supportButtonView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

import { StyleSheet } from 'react-native';

export const FormIntroStyle = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 50,
    paddingHorizontal: 30,
    alignItems: 'center'
  },
  emojiView: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emoji: {
    fontSize: 30
  },
  title: {
    marginTop: 14,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center'
  }
});

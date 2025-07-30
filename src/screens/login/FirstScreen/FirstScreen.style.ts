import { StyleSheet } from 'react-native';

export const FirstScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '20%',
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 75,
    height: 75
  },
  titleText: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  startButton: {
    marginTop: '80%'
  },
  loginButtonView: {
    marginTop: '20%'
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600'
  }
});

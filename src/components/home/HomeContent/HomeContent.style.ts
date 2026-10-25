import { StyleSheet } from 'react-native';

export const HomeContentStyle = StyleSheet.create({
  container: {
    paddingBottom: '10%'
  },
  scrollView: {
    height: '75%',
    paddingTop: '10%',
    overflow: 'visible'
  },
  image: {
    marginTop: 20,
    width: '95%',
    height: 300,
    alignSelf: 'center'
  },
  footerContainer: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  footerButtonRow: {
    flexDirection: 'row'
  }
});

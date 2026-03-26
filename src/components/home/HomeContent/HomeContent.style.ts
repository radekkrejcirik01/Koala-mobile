import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const HomeContentStyle = StyleSheet.create({
  container: {
    paddingBottom: '10%'
  },
  scrollView: {
    overflow: 'visible'
  },
  image: {
    marginTop: 20,
    width: '95%',
    height: 300,
    alignSelf: 'center'
  },
  footerContainer: {
    paddingTop: 250,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bottomButtonView: {
    width: 110,
    height: 52,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  bottomButtonText: {
    color: COLORS.BLACK,
    fontSize: 16,
    fontWeight: 'bold'
  }
});

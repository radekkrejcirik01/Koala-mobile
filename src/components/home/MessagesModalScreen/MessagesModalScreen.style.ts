import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const MessagesModalScreenStyle = StyleSheet.create({
  container: {
    height: '80%',
    paddingTop: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  title: {
    fontSize: 22,
    marginLeft: 25,
    color: COLORS.LIGHTGRAY_200,
    fontWeight: 'bold'
  },
  scrollView: {
    marginTop: 20,
    alignSelf: 'flex-start',
    flexGrow: 0
  },
  scrollViewContainer: {
    paddingLeft: 25
  },
  tabButtonView: {
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    alignSelf: 'flex-start'
  },
  tabButtonText: {
    fontWeight: 'bold'
  }
});

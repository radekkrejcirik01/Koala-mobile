import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const MessagesModalScreenStyle = StyleSheet.create({
  container: {
    height: '80%',
    paddingTop: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  headerView: {
    paddingLeft: 20,
    paddingRight: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    color: COLORS.PURPLE,
    fontWeight: '800'
  },
  addText: {
    fontSize: 15,
    color: COLORS.LIGHTGRAY_200,
    fontWeight: 'bold'
  },
  tabScrollView: {
    marginTop: 25,
    alignSelf: 'flex-start'
  },
  tabScrollViewContainer: {
    paddingLeft: 20
  },
  tabButtonView: {
    marginRight: 10,
    padding: 10,
    borderRadius: 20,
    alignSelf: 'flex-start'
  },
  tabButtonText: {
    fontWeight: 'bold'
  },
  contentScrollView: {
    marginTop: 15,
    paddingTop: 5
  },
  contentButtonView: {
    paddingVertical: 12,
    paddingHorizontal: 25
  },
  contentButtonText: {
    fontSize: 20,
    color: COLORS.LIGHTGRAY_200,
    fontWeight: '800'
  }
});

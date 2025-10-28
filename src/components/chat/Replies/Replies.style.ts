import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const RepliesStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 25,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  buttonView: {
    minWidth: 70,
    marginVertical: 4,
    marginHorizontal: 2,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center'
  },
  buttonText: {
    fontWeight: '500'
  },
  addView: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center'
  },
  addText: {
    color: COLORS.PURPLE
  },
  activityIndicator: {
    marginBottom: 100
  }
});

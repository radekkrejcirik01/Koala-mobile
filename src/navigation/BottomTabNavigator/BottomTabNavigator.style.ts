import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const BottomTabNavigatorStyle = StyleSheet.create({
  tabBarIconEmoji: {
    marginTop: 5,
    fontSize: 24,
    color: COLORS.BLACK_50
  },
  tabBarIconImage: {
    height: 28,
    width: 28,
    marginTop: 5,
    opacity: 0.9
  }
});

import { StyleSheet } from 'react-native';
import COLORS from '@constants/COLORS';

export const EmotionCarouselStyle = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 90,
    marginBottom: 20
  },
  item: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emoji: {
    color: COLORS.BLACK,
    fontSize: 72
  }
});

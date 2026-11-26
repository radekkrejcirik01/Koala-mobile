import { useSelector } from 'react-redux';
import { useColorScheme } from 'react-native';
import {
  beigeTheme,
  blueTheme,
  darkTheme,
  greenTheme,
  lightTheme,
  Theme
} from '../theme.ts';
import { ReducerProps } from '@store/index/index.props.ts';
import { Images } from '@enums/images.ts';

const getTheme = (image: Images, isDark: boolean): Theme => {
  // One dark background whichever background is chosen
  if (isDark) {
    return darkTheme;
  }
  if (image === Images.ROOM) {
    return beigeTheme;
  }
  if (image === Images.PARK) {
    return greenTheme;
  }
  if (image === Images.SEA) {
    return blueTheme;
  }
  return lightTheme;
};

export const useTheme = () => {
  const { image } = useSelector((state: ReducerProps) => state.user);

  // Already includes the in-app appearance override, see AppearanceService
  const isDark = useColorScheme() === 'dark';

  return { theme: getTheme(image, isDark), isDark };
};

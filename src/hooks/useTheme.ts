import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { beigeTheme, blueTheme, greenTheme, lightTheme } from '../theme.ts';
import { ReducerProps } from '@store/index/index.props.ts';
import { Images } from '@enums/images.ts';
import { useColorScheme } from 'react-native';

export const useTheme = () => {
  const { image } = useSelector((state: ReducerProps) => state.user);

  const systemScheme = useColorScheme(); // 'light' | 'dark' | null
  const [isDark, setIsDark] = useState(systemScheme === 'dark');

  useEffect(() => {
    setIsDark(systemScheme === 'dark');
  }, [systemScheme]);

  const getTheme = () => {
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

  return { theme: getTheme(), isDark };
};

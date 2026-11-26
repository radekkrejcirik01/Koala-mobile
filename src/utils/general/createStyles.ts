import { StyleSheet } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { Theme, ThemeColors } from '../../theme';

// A StyleSheet that depends on the theme colors, used as a hook:
//   export const useFooStyle = createStyles((colors, isDark) => ({ ... }));
//   const FooStyle = useFooStyle();
// Sheets are built once per theme and reused
export const createStyles = <T extends StyleSheet.NamedStyles<T>>(
  factory: (colors: ThemeColors, isDark: boolean) => T
) => {
  const cache = new WeakMap<Theme, T>();

  return (): T => {
    const { theme } = useTheme();
    let styles = cache.get(theme);
    if (!styles) {
      styles = StyleSheet.create(factory(theme.colors, theme.dark));
      cache.set(theme, styles);
    }
    return styles;
  };
};

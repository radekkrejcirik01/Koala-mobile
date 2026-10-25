import { useCallback, useEffect } from 'react';
import { useNavigation as useNavigationModule } from '@react-navigation/native';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { LoginStackNavigatorEnum } from '@navigation/StackNavigators/login/LoginStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';

type ScreenProp =
  | RootStackNavigatorEnum
  | LoginStackNavigatorEnum
  | AccountStackNavigatorEnum;

type NavigateFn = (screen: string, params?: object) => void;

export const useNavigation = (
  stack?: RootStackNavigatorEnum,
  onFocus?: () => void
): {
  navigateTo: (screen: ScreenProp, params?: object) => void;
  navigateBack: () => void;
  dismiss: () => void;
} => {
  const navigation = useNavigationModule();
  const navigate = navigation.navigate as unknown as NavigateFn;

  useEffect(
    () =>
      navigation.addListener('focus', () => {
        if (onFocus) onFocus();
      }),
    [onFocus, navigation]
  );

  const navigateTo = useCallback(
    (screen: ScreenProp, params: object = {}) =>
      stack
        ? navigate(stack, { screen, params })
        : navigate(screen, params),
    [navigate, stack]
  );

  const navigateBack = useCallback(() => navigation.goBack(), [navigation]);

  // Pops the nearest ANCESTOR navigator instead of the current one -
  // useful for dismissing a nested flow (e.g. a modal containing its own
  // stack) back to whatever screen presented it.
  const dismiss = useCallback(() => {
    const parent = navigation.getParent();
    (parent ?? navigation).goBack();
  }, [navigation]);

  return { navigateTo, navigateBack, dismiss };
};

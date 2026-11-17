import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@hooks/useNavigation';
import { ReducerProps } from '@store/index/index.props';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';

// Without an email the password can't be reset, so ask for one once per login
// or sign up, and once for users who were already logged in
export const useEmailPrompt = () => {
  const { id, username, email } = useSelector(
    (state: ReducerProps) => state.user.user
  );
  const { username: newUsername } = useSelector(
    (state: ReducerProps) => state.newAccount
  );
  const { navigateTo } = useNavigation();

  useEffect(() => {
    if (!id || email) {
      return;
    }

    PersistStorage.getItem(PersistStorageKeys.EMAIL_PROMPTED)
      .then((promptedId: string) => {
        if (promptedId === String(id)) {
          return;
        }

        PersistStorage.setItem(
          PersistStorageKeys.EMAIL_PROMPTED,
          String(id)
        ).catch();

        navigateTo(AccountStackNavigatorEnum.EmailScreen, {
          prompt: true,
          // Just signed up on this device, the email is the last step
          onboarding: !!newUsername && newUsername === username
        });
      })
      .catch();
  }, [email, id, navigateTo, newUsername, username]);
};

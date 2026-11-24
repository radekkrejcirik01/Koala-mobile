import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { getRequest } from '@utils/Axios/Axios.service';
import { ResponseMessagesGetInterface } from '@interfaces/response/Response.interface';
import { UserInterface } from '@interfaces/general.interface';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';

// Goes back to the chat with the friend, opened at one of its messages. The
// messages around it load first, so a deleted one keeps the current screen
export const useJumpToMessage = (
  friend: UserInterface
): {
  jumpTo: (messageId: number) => void;
  // The message whose chat is loading
  jumpingId?: number;
} => {
  const navigation = useNavigation();

  const [jumpingId, setJumpingId] = useState<number>();

  const jumpTo = useCallback(
    (messageId: number) => {
      setJumpingId(messageId);

      getRequest<ResponseMessagesGetInterface>(
        `chats/${friend.id}/messages?aroundId=${messageId}`
      ).subscribe((response: ResponseMessagesGetInterface) => {
        setJumpingId(undefined);

        if (!response?.data?.length) {
          Alert.alert('This message is no longer available');
          return;
        }

        navigation.dispatch(
          StackActions.popTo(AccountStackNavigatorEnum.ChatScreen, {
            ...friend,
            jump: { id: messageId, messages: response.data, at: Date.now() }
          })
        );
      });
    },
    [friend, navigation]
  );

  return { jumpTo, jumpingId };
};

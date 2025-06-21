import React, { JSX, useCallback, useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@hooks/useNavigation';
import { useModal } from '@hooks/useModal';
import { ShareModalScreen } from '@components/home/ShareModalScreen/ShareModalScreen';
import { FriendsModalScreen } from '@components/friends/FriendsModalScreen/FriendsModalScreen';
import { DirectSharingModalScreen } from '@components/home/DirectSharingModalScreen/DirectSharingModalScreen';
import { Modal } from '@components/general/Modal/Modal';
import { MessagesStyle } from '@components/home/Messages/Messages.style';
import { ToolBar } from '@components/home/ToolBar/ToolBar';
import { EmotionInterface } from '@interfaces/general.interface';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { getRequest } from '@utils/Axios/Axios.service';
import { ResponseLastSharedMessageGetInterface } from '@interfaces/response/Response.interface';
import { ANXIETY_AND_PANIC_MESSAGES } from '@screens/account/AnxietyAndPanicScreen/AnxietyAndPanicScreen.const';
import { DEPRESSION_MESSAGES } from '@screens/account/DepressionScreen/DepressionScreen.const';
import { WELLBEING_MESSAGES } from '@screens/account/WellbeingScreen/WellbeingScreen.const';
import { KUDOS_MESSAGES } from '@screens/account/KudosScreen/KudosScreen.const';
import { MessagesCard } from '@components/home/MessagesCard/MessagesCard';
import { LastlySharedCard } from '@components/home/LastlySharedCard/LastlySharedCard';

export const Messages = (): JSX.Element => {
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);
  const { modalVisible, showModal, hideModal } = useModal();

  const [lastShared, setLastShared] = useState<EmotionInterface>(undefined);
  const [suggested, setSuggested] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<JSX.Element>(<></>);

  function getMessage(
    message: string,
    ...arrays: EmotionInterface[][]
  ): EmotionInterface | undefined {
    return arrays
      .flat() // Flatten the array of arrays into a single array
      .find((obj) => obj.message === message);
  }

  const getLastSharedMessage = useCallback(() => {
    getRequest<ResponseLastSharedMessageGetInterface>(
      'last-shared-message'
    ).subscribe((response: ResponseLastSharedMessageGetInterface) => {
      if (response?.status) {
        if (!response?.data?.message) {
          setLastShared(KUDOS_MESSAGES[1]);
          setSuggested(true);
          return;
        }

        const emotion = getMessage(
          response?.data?.message,
          ANXIETY_AND_PANIC_MESSAGES,
          DEPRESSION_MESSAGES,
          WELLBEING_MESSAGES,
          KUDOS_MESSAGES
        );

        setLastShared(emotion || response?.data);
      }
    });
  }, []);

  useFocusEffect(getLastSharedMessage);

  const openLastMessage = useCallback(() => {
    setModalContent(
      <ShareModalScreen
        item={lastShared}
        onAddFriendPress={() => {
          hideModal();
          setModalContent(<FriendsModalScreen />);
          setTimeout(() => {
            showModal();
          }, 100);
        }}
      />
    );
    showModal();
  }, [hideModal, lastShared, showModal]);

  const onDirectEmotionPress = useCallback(() => {
    setModalContent(
      <DirectSharingModalScreen
        onAddFriendPress={() => {
          hideModal();
          setModalContent(<FriendsModalScreen />);
          setTimeout(() => {
            showModal();
          }, 100);
        }}
      />
    );
    showModal();
  }, [hideModal, showModal]);

  const hideModalAndKeyboard = useCallback(() => {
    Keyboard.dismiss();
    hideModal();
  }, [hideModal]);

  return (
    <View>
      <Text style={MessagesStyle.titleText}>
        {suggested ? 'Suggested' : 'Lastly shared'}
      </Text>
      <LastlySharedCard title={lastShared?.message} onPress={openLastMessage} />
      <Text style={MessagesStyle.titleText}>Messages</Text>
      <View style={MessagesStyle.itemsContainer}>
        <MessagesCard
          title="Anxiety & panic"
          onPress={() =>
            navigateTo(AccountStackNavigatorEnum.AnxietyAndPanicScreen)
          }
          image={require('../../../assets/images/Anxiety_no_bg.png')}
          imageStyle={MessagesStyle.anxietyImage}
        />
        <MessagesCard
          title="Depression"
          onPress={() => navigateTo(AccountStackNavigatorEnum.DepressionScreen)}
          image={require('../../../assets/images/Depression_no_bg.png')}
          imageStyle={MessagesStyle.depressionImage}
        />
        <MessagesCard
          title="Wellbeing"
          onPress={() => navigateTo(AccountStackNavigatorEnum.WellbeingScreen)}
          image={require('../../../assets/images/Wellbeing_no_bg.png')}
          imageStyle={MessagesStyle.wellbeingImage}
        />
        <MessagesCard
          title="Kudos"
          onPress={() => navigateTo(AccountStackNavigatorEnum.KudosScreen)}
          image={require('../../../assets/images/Kudos_no_bg.png')}
          imageStyle={MessagesStyle.kudosImage}
          isKudos
        />
      </View>
      <ToolBar onPressDirect={onDirectEmotionPress} />
      <Modal
        isVisible={modalVisible}
        content={modalContent}
        onClose={() => {
          hideModalAndKeyboard();
          getLastSharedMessage();
        }}
        style={MessagesStyle.modal}
      />
    </View>
  );
};

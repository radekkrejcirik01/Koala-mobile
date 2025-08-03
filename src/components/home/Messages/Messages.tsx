import React, { JSX, useCallback, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { useNavigation } from '@hooks/useNavigation';
import { useModal } from '@hooks/useModal';
import { FriendsModalScreen } from '@components/friends/FriendsModalScreen/FriendsModalScreen';
import { DirectSharingModalScreen } from '@components/home/DirectSharingModalScreen/DirectSharingModalScreen';
import { Modal } from '@components/general/Modal/Modal';
import { MessagesStyle } from '@components/home/Messages/Messages.style';
import { ToolBar } from '@components/home/ToolBar/ToolBar';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { MessagesCard } from '@components/home/MessagesCard/MessagesCard';

export const Messages = (): JSX.Element => {
  const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);
  const { modalVisible, showModal, hideModal } = useModal();

  const [modalContent, setModalContent] = useState<JSX.Element>(<></>);

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
    <View style={{ marginTop: 40 }}>
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
        }}
        style={MessagesStyle.modal}
      />
    </View>
  );
};

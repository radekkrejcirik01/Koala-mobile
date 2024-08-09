import React, { JSX, useCallback, useState } from 'react';
import { Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@hooks/useNavigation';
import { useModal } from '@hooks/useModal';
import { ShareModalScreen } from '@components/home/ShareModalScreen/ShareModalScreen';
import { FriendsModalScreen } from '@components/friends/FriendsModalScreen/FriendsModalScreen';
import { DirectSharingModalScreen } from '@components/home/DirectSharingModalScreen/DirectSharingModalScreen';
import { Modal } from '@components/general/Modal/Modal';
import { MessagesStyle } from '@components/home/Messages/Messages.style';
import { ToolBar } from '@components/home/ToolBar/ToolBar';
import { EmotionInterface } from '@interfaces/general.interface';
import COLORS from '@constants/COLORS';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';

export const Messages = (): JSX.Element => {
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);
    const { modalVisible, showModal, hideModal } = useModal();

    const [lastShared, setLastShared] = useState<EmotionInterface>({
        id: 1,
        message: 'I feel better now',
        tip1: 'Good 1',
        tip2: 'Good 2'
    });
    const [modalContent, setModalContent] = useState<JSX.Element>(<></>);

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
            <Text style={MessagesStyle.titleText}>Lastly shared</Text>
            <View style={MessagesStyle.cardView}>
                <Text style={MessagesStyle.cardText}>{lastShared.message}</Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={openLastMessage}
                    style={MessagesStyle.cardButton}
                >
                    <Text style={MessagesStyle.cardButtonText}>💭</Text>
                </TouchableOpacity>
            </View>
            <Text style={MessagesStyle.titleText}>Messages</Text>
            <View style={MessagesStyle.itemsContainer}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                        navigateTo(
                            AccountStackNavigatorEnum.AnxietyAndPanicScreen
                        )
                    }
                    style={MessagesStyle.buttonView}
                >
                    <Text style={MessagesStyle.buttonText}>
                        Anxiety & panic
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                        navigateTo(AccountStackNavigatorEnum.DepressionScreen)
                    }
                    style={MessagesStyle.buttonView}
                >
                    <Text style={MessagesStyle.buttonText}>Depression</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                        navigateTo(AccountStackNavigatorEnum.WellbeingScreen)
                    }
                    style={MessagesStyle.buttonView}
                >
                    <Text style={MessagesStyle.buttonText}>Wellbeing</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                        navigateTo(AccountStackNavigatorEnum.KudosScreen)
                    }
                    style={[
                        MessagesStyle.buttonView,
                        { backgroundColor: COLORS.PURPLE }
                    ]}
                >
                    <Text
                        style={[
                            MessagesStyle.buttonText,
                            { color: COLORS.WHITE }
                        ]}
                    >
                        Kudos
                    </Text>
                </TouchableOpacity>
            </View>
            <ToolBar onPressDirect={onDirectEmotionPress} />
            <Modal
                isVisible={modalVisible}
                content={modalContent}
                onClose={hideModalAndKeyboard}
                style={MessagesStyle.modal}
            />
        </View>
    );
};

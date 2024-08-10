import React, { JSX, useCallback, useEffect, useState } from 'react';
import { Keyboard, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
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
import { getRequest } from '@utils/Axios/Axios.service';
import { ResponseLastSharedMessageGetInterface } from '@interfaces/response/Response.interface';
import { ANXIETY_AND_PANIC_MESSAGES } from '@screens/account/AnxietyAndPanicScreen/AnxietyAndPanicScreen.const';
import { DEPRESSION_MESSAGES } from '@screens/account/DepressionScreen/DepressionScreen.const';
import { WELLBEING_MESSAGES } from '@screens/account/WellbeingScreen/WellbeingScreen.const';
import { KUDOS_MESSAGES } from '@screens/account/KudosScreen/KudosScreen.const';

export const Messages = (): JSX.Element => {
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);
    const { modalVisible, showModal, hideModal } = useModal();

    const [lastShared, setLastShared] = useState<EmotionInterface>(undefined);
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

    useEffect(() => {
        getLastSharedMessage();
    }, [getLastSharedMessage]);

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
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={openLastMessage}
                style={MessagesStyle.cardView}
            >
                <Text style={MessagesStyle.cardText}>
                    {lastShared?.message}
                </Text>
                <View style={MessagesStyle.cardButton}>
                    <Text style={MessagesStyle.cardButtonText}>💭</Text>
                </View>
            </TouchableOpacity>
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
                    <FastImage
                        source={require('../../../assets/images/Anxiety_no_bg.png')}
                        style={MessagesStyle.anxietyImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                        navigateTo(AccountStackNavigatorEnum.DepressionScreen)
                    }
                    style={MessagesStyle.buttonView}
                >
                    <Text style={MessagesStyle.buttonText}>Depression</Text>
                    <FastImage
                        source={require('../../../assets/images/Depression_no_bg.png')}
                        style={MessagesStyle.depressionImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                        navigateTo(AccountStackNavigatorEnum.WellbeingScreen)
                    }
                    style={MessagesStyle.buttonView}
                >
                    <Text style={MessagesStyle.buttonText}>Wellbeing</Text>
                    <FastImage
                        source={require('../../../assets/images/Wellbeing_no_bg.png')}
                        style={MessagesStyle.wellbeingImage}
                    />
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
                    <FastImage
                        source={require('../../../assets/images/Kudos_no_bg.png')}
                        style={MessagesStyle.kudosImage}
                    />
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

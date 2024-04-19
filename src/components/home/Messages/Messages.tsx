import React, { useCallback, useEffect, useState } from 'react';
import {
    Keyboard,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useModal } from '@hooks/useModal';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { EmotionInterface } from '@interfaces/general.interface';
import { deleteRequest, getRequest } from '@utils/Axios/Axios.service';
import {
    ResponseEmotionsGetInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import { DATA } from '@screens/account/HomeScreen/HomeScreen.const';
import { ShareModalScreen } from '@components/home/ShareModalScreen/ShareModalScreen';
import { FriendsModalScreen } from '@components/home/FriendsModalScreen/FriendsModalScreen';
import { DirectEmotionModalScreen } from '@components/home/DirectEmotionModalScreen/DirectEmotionModalScreen';
import { Modal } from '@components/general/Modal/Modal';
import { AddEmotionModalScreen } from '@components/home/AddEmotionModalScreen/AddEmotionModalScreen';
import { MessagesStyle } from '@components/home/Messages/Messages.style';

export const Messages = (): React.JSX.Element => {
    const { showActionSheetWithOptions } = useActionSheet();
    const { modalVisible, showModal, hideModal } = useModal();

    const [messages, setMessages] = useState<EmotionInterface[]>([]);
    const [modalContent, setModalContent] = useState<React.JSX.Element>(<></>);

    const loadMessages = useCallback(() => {
        getRequest<ResponseEmotionsGetInterface>('emotions').subscribe(
            (response: ResponseEmotionsGetInterface) => {
                if (response?.status) {
                    setMessages([...DATA, ...(response?.data || [])]);
                }
            }
        );
    }, []);

    useEffect(() => {
        loadMessages();
    }, [loadMessages]);

    const onItemPress = useCallback(
        (item: EmotionInterface) => {
            setModalContent(
                <ShareModalScreen
                    item={item}
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
        },
        [hideModal, showModal]
    );

    const removeEmotion = useCallback(
        (id: number) => {
            deleteRequest<ResponseInterface>(`emotion/${id}`).subscribe(
                (response: ResponseInterface) => {
                    if (response?.status) {
                        loadMessages();
                    }
                }
            );
        },
        [loadMessages]
    );

    const onItemLongPress = useCallback(
        (item: EmotionInterface) => {
            // Enable removing only custom emotions
            if (!item?.isCustom) {
                return;
            }

            const options = ['Remove emotion', 'Cancel'];

            showActionSheetWithOptions(
                {
                    options,
                    cancelButtonIndex: 1,
                    userInterfaceStyle: 'light',
                    title: item?.emotion
                },
                (selectedIndex: number) => {
                    if (selectedIndex === 0) {
                        removeEmotion(item.id);
                    }
                }
            );
        },
        [removeEmotion, showActionSheetWithOptions]
    );

    const hideModalAndKeyboard = useCallback(() => {
        Keyboard.dismiss();
        hideModal();
    }, [hideModal]);

    const onAddItemPress = useCallback(() => {
        setModalContent(
            <AddEmotionModalScreen
                onAdded={() => {
                    loadMessages();
                    hideModalAndKeyboard();
                }}
            />
        );
        showModal();
    }, [hideModalAndKeyboard, loadMessages, showModal]);

    const onDirectEmotionPress = useCallback(() => {
        setModalContent(
            <DirectEmotionModalScreen
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

    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={MessagesStyle.scrollView}
                contentContainerStyle={MessagesStyle.scrollViewContainer}
            >
                <View style={MessagesStyle.contentView}>
                    {messages.map((value) => (
                        <TouchableOpacity
                            key={value.id}
                            activeOpacity={0.7}
                            onPress={() => onItemPress(value)}
                            onLongPress={() => onItemLongPress(value)}
                            delayLongPress={150}
                            style={MessagesStyle.buttonView}
                        >
                            <Text style={MessagesStyle.buttonText}>
                                {value.emotion}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={onAddItemPress}
                        style={MessagesStyle.buttonView}
                    >
                        <Text style={MessagesStyle.buttonText}>Add +</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    hitSlop={20}
                    onPress={onDirectEmotionPress}
                    style={MessagesStyle.directEmotionButtonView}
                >
                    <Text style={MessagesStyle.directEmotionText}>
                        Direct sharing
                    </Text>
                    <Icon
                        name={IconEnum.DIRECT}
                        size={15}
                        style={MessagesStyle.directIcon}
                    />
                </TouchableOpacity>
            </ScrollView>
            <Modal
                isVisible={modalVisible}
                content={modalContent}
                onClose={hideModalAndKeyboard}
                style={MessagesStyle.modal}
            />
        </>
    );
};

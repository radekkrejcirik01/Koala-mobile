import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useModal } from '@hooks/useModal';
import { EmotionInterface } from '@interfaces/general.interface';
import { deleteRequest, getRequest } from '@utils/Axios/Axios.service';
import {
    ResponseEmotionsGetInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import { ShareModalScreen } from '@components/home/ShareModalScreen/ShareModalScreen';
import { FriendsModalScreen } from '@components/friends/FriendsModalScreen/FriendsModalScreen';
import { DirectSharingModalScreen } from '@components/home/DirectSharingModalScreen/DirectSharingModalScreen';
import { Modal } from '@components/general/Modal/Modal';
import { AddEmotionModalScreen } from '@components/home/AddEmotionModalScreen/AddEmotionModalScreen';
import { MessagesStyle } from '@components/home/Messages/Messages.style';
import { MESSAGES } from '@components/home/Messages/Messages.const';
import { ToolBar } from '@components/home/ToolBar/ToolBar';

export const Messages = (): React.JSX.Element => {
    const { showActionSheetWithOptions } = useActionSheet();
    const { modalVisible, showModal, hideModal } = useModal();

    const [messages, setMessages] = useState<EmotionInterface[]>([]);
    const [modalContent, setModalContent] = useState<React.JSX.Element>(<></>);

    const loadMessages = useCallback(() => {
        getRequest<ResponseEmotionsGetInterface>('emotions').subscribe(
            (response: ResponseEmotionsGetInterface) => {
                if (response?.status) {
                    setMessages([...MESSAGES, ...(response?.data || [])]);
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
            if (item?.isDefault) {
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

    return (
        <View style={MessagesStyle.container}>
            <Text style={MessagesStyle.titleText}>How do you feel today?</Text>
            <ToolBar onPressDirect={onDirectEmotionPress} />
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
            <Modal
                isVisible={modalVisible}
                content={modalContent}
                onClose={hideModalAndKeyboard}
                style={MessagesStyle.modal}
            />
        </View>
    );
};

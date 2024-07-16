import React, { JSX, useCallback, useEffect, useState } from 'react';
import { Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useAppState } from '@hooks/useAppState';
import { useModal } from '@hooks/useModal';
import { EmotionInterface } from '@interfaces/general.interface';
import {
    deleteRequest,
    getRequest,
    postRequest
} from '@utils/Axios/Axios.service';
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
import { RemovedEmotionPostInterface } from '@interfaces/post/Post.interface';
import { getGreeting } from '@functions/getGreeting';

export const Messages = (): JSX.Element => {
    const { showActionSheetWithOptions } = useActionSheet();
    const { modalVisible, showModal, hideModal } = useModal();

    const [messages, setMessages] = useState<EmotionInterface[]>([]);
    const [modalContent, setModalContent] = useState<React.JSX.Element>(<></>);

    const [greeting, setGreeting] = useState<string>();

    useAppState(() => {
        setGreeting(getGreeting());
    });

    useEffect(() => {
        setGreeting(getGreeting());
    }, []);

    const loadMessages = useCallback(() => {
        getRequest<ResponseEmotionsGetInterface>('emotions').subscribe(
            (response: ResponseEmotionsGetInterface) => {
                if (response?.status) {
                    let defaultMessages = MESSAGES;

                    if (response?.removed) {
                        defaultMessages = MESSAGES.filter(
                            (e) => !response.removed.includes(e?.id)
                        );
                    }

                    setMessages([
                        ...defaultMessages,
                        ...(response?.data || [])
                    ]);
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

    const removeDefaultEmotion = useCallback(
        (id: number) => {
            postRequest<ResponseInterface, RemovedEmotionPostInterface>(
                'removed-emotion',
                {
                    emotionId: id
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) {
                    loadMessages();
                }
            });
        },
        [loadMessages]
    );

    const onItemLongPress = useCallback(
        (item: EmotionInterface) => {
            const options = ['Remove message', 'Cancel'];

            showActionSheetWithOptions(
                {
                    options,
                    cancelButtonIndex: 1,
                    userInterfaceStyle: 'light',
                    title: item?.emotion
                },
                (selectedIndex: number) => {
                    if (selectedIndex === 0) {
                        if (item?.isDefault) {
                            removeDefaultEmotion(item.id);
                        } else {
                            removeEmotion(item.id);
                        }
                    }
                }
            );
        },
        [removeDefaultEmotion, removeEmotion, showActionSheetWithOptions]
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
            <Text style={MessagesStyle.titleText}>{greeting}</Text>
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

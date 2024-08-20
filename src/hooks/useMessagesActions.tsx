import React, { JSX, useCallback, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { EmotionInterface } from '@interfaces/general.interface';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useModal } from '@hooks/useModal';
import { deleteRequest, getRequest } from '@utils/Axios/Axios.service';
import {
    ResponseEmotionsGetInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import { ShareModalScreen } from '@components/home/ShareModalScreen/ShareModalScreen';
import { FriendsModalScreen } from '@components/friends/FriendsModalScreen/FriendsModalScreen';
import { AddEmotionModalScreen } from '@components/home/AddEmotionModalScreen/AddEmotionModalScreen';
import { EmotionScreenMessageType } from '@enums/EmotionScreenMessageType';
import { ANXIETY_AND_PANIC_MESSAGES } from '@screens/account/AnxietyAndPanicScreen/AnxietyAndPanicScreen.const';
import { DEPRESSION_MESSAGES } from '@screens/account/DepressionScreen/DepressionScreen.const';
import { WELLBEING_MESSAGES } from '@screens/account/WellbeingScreen/WellbeingScreen.const';
import { KUDOS_MESSAGES } from '@screens/account/KudosScreen/KudosScreen.const';

export const useMessagesActions = (
    type: EmotionScreenMessageType
): {
    messages: EmotionInterface[];
    modalScreen: JSX.Element;
    modalVisible: boolean;
    onPressMessage: (item: EmotionInterface) => void;
    onPressAddEmotion: () => void;
    onItemLongPress: (item: EmotionInterface) => void;
    hideModalAndKeyboard: () => void;
} => {
    const { showActionSheetWithOptions } = useActionSheet();
    const { modalVisible, showModal, hideModal } = useModal();

    const [messages, setMessages] = useState<EmotionInterface[]>([]);
    const [modalScreen, setModalScreen] = useState<JSX.Element>(<></>);

    const getDefaultMessages = useCallback((): EmotionInterface[] => {
        if (type === EmotionScreenMessageType.Anxiety) {
            return ANXIETY_AND_PANIC_MESSAGES;
        }
        if (type === EmotionScreenMessageType.Depression) {
            return DEPRESSION_MESSAGES;
        }
        if (type === EmotionScreenMessageType.Wellbeing) {
            return WELLBEING_MESSAGES;
        }
        return KUDOS_MESSAGES;
    }, [type]);

    const loadMessages = useCallback(() => {
        const endpoint = `emotions-messages/${type}`;
        const defaultMessages = getDefaultMessages();

        getRequest<ResponseEmotionsGetInterface>(endpoint).subscribe(
            (response: ResponseEmotionsGetInterface) => {
                if (response?.status) {
                    setMessages([
                        ...defaultMessages,
                        ...(response?.data || [])
                    ]);
                }
            }
        );
    }, [getDefaultMessages, type]);

    useEffect(() => {
        loadMessages();
    }, [loadMessages]);

    const onPressMessage = useCallback(
        (item: EmotionInterface) => {
            setModalScreen(
                <ShareModalScreen
                    item={item}
                    onAddFriendPress={() => {
                        hideModal();
                        setModalScreen(<FriendsModalScreen />);
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

    const hideModalAndKeyboard = useCallback(() => {
        Keyboard.dismiss();
        hideModal();
    }, [hideModal]);

    const onPressAddEmotion = useCallback(() => {
        setModalScreen(
            <AddEmotionModalScreen
                onAdded={() => {
                    loadMessages();
                    hideModalAndKeyboard();
                }}
                type={type}
            />
        );
        showModal();
    }, [hideModalAndKeyboard, loadMessages, showModal, type]);

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
            if (item?.isDefault) {
                return;
            }

            const options = ['Remove message', 'Cancel'];

            showActionSheetWithOptions(
                {
                    options,
                    cancelButtonIndex: 1,
                    userInterfaceStyle: 'light',
                    title: item?.message
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

    return {
        messages,
        modalScreen,
        modalVisible,
        onPressMessage,
        onPressAddEmotion,
        onItemLongPress,
        hideModalAndKeyboard
    };
};

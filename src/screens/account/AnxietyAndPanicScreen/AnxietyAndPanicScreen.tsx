import React, { JSX, useCallback, useEffect, useState } from 'react';
import {
    Keyboard,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useActionSheet } from '@expo/react-native-action-sheet';
import FastImage from 'react-native-fast-image';
import { useModal } from '@hooks/useModal';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { AnxietyAndPanicScreenStyle } from '@screens/account/AnxietyAndPanicScreen/AnxietyAndPanicScreen.style';
import { Modal } from '@components/general/Modal/Modal';
import { ShareModalScreen } from '@components/home/ShareModalScreen/ShareModalScreen';
import { FriendsModalScreen } from '@components/friends/FriendsModalScreen/FriendsModalScreen';
import { EmotionInterface } from '@interfaces/general.interface';
import { ANXIETY_AND_PANIC_MESSAGES } from '@screens/account/AnxietyAndPanicScreen/AnxietyAndPanicScreen.const';
import { deleteRequest, getRequest } from '@utils/Axios/Axios.service';
import {
    ResponseEmotionsGetInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import COLORS from '@constants/COLORS';
import { AddEmotionModalScreen } from '@components/home/AddEmotionModalScreen/AddEmotionModalScreen';
import { AddEmotionModalScreenEnum } from '@components/home/AddEmotionModalScreen/AddEmotionModalScreen.enum';

export const AnxietyAndPanicScreen = (): JSX.Element => {
    const { top } = useSafeAreaInsets();
    const { showActionSheetWithOptions } = useActionSheet();
    const { modalVisible, showModal, hideModal } = useModal();

    const [messages, setMessages] = useState<EmotionInterface[]>([]);
    const [modalContent, setModalContent] = useState<JSX.Element>(<></>);

    const loadMessages = useCallback(() => {
        getRequest<ResponseEmotionsGetInterface>(
            'emotions-messages/anxiety'
        ).subscribe((response: ResponseEmotionsGetInterface) => {
            if (response?.status) {
                setMessages([
                    ...ANXIETY_AND_PANIC_MESSAGES,
                    ...(response?.data || [])
                ]);
            }
        });
    }, []);

    useEffect(() => {
        loadMessages();
    }, [loadMessages]);

    const onPressMessage = useCallback(
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

    const hideModalAndKeyboard = useCallback(() => {
        Keyboard.dismiss();
        hideModal();
    }, [hideModal]);

    const onPressAddEmotion = useCallback(() => {
        setModalContent(
            <AddEmotionModalScreen
                onAdded={() => {
                    loadMessages();
                    hideModalAndKeyboard();
                }}
                type={AddEmotionModalScreenEnum.AnxietyEmotionType}
            />
        );
        showModal();
    }, [hideModalAndKeyboard, loadMessages, showModal]);

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

    return (
        <View style={[AnxietyAndPanicScreenStyle.container, { top }]}>
            <ScreenHeader
                title="Anxiety & panic"
                rightComponent={
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={onPressAddEmotion}
                    >
                        <Text style={{ color: COLORS.PURPLE }}>Add +</Text>
                    </TouchableOpacity>
                }
            />
            <ScrollView
                contentContainerStyle={AnxietyAndPanicScreenStyle.scrollView}
            >
                <FastImage
                    source={require('../../../assets/images/Anxiety.png')}
                    style={AnxietyAndPanicScreenStyle.image}
                />
                <View style={AnxietyAndPanicScreenStyle.messagesContainer}>
                    {messages.map((value) => (
                        <TouchableOpacity
                            key={value.id}
                            activeOpacity={0.7}
                            onPress={() => onPressMessage(value)}
                            onLongPress={() => onItemLongPress(value)}
                            delayLongPress={150}
                            style={AnxietyAndPanicScreenStyle.buttonView}
                        >
                            <Text style={AnxietyAndPanicScreenStyle.buttonText}>
                                {value.message}
                            </Text>
                            <Text>💬</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <Modal
                isVisible={modalVisible}
                content={modalContent}
                onClose={hideModal}
                style={AnxietyAndPanicScreenStyle.modal}
            />
        </View>
    );
};
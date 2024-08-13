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
import { EmotionInterface } from '@interfaces/general.interface';
import { ShareModalScreen } from '@components/home/ShareModalScreen/ShareModalScreen';
import { FriendsModalScreen } from '@components/friends/FriendsModalScreen/FriendsModalScreen';
import { Modal } from '@components/general/Modal/Modal';
import { KudosScreenStyle } from '@screens/account/KudosScreen/KudosScreen.style';
import { KUDOS_MESSAGES } from '@screens/account/KudosScreen/KudosScreen.const';
import { deleteRequest, getRequest } from '@utils/Axios/Axios.service';
import {
    ResponseEmotionsGetInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import { AddEmotionModalScreen } from '@components/home/AddEmotionModalScreen/AddEmotionModalScreen';
import { AddEmotionModalScreenEnum } from '@components/home/AddEmotionModalScreen/AddEmotionModalScreen.enum';
import { MessageItem } from '@components/home/MessageItem/MessageItem';

export const KudosScreen = (): JSX.Element => {
    const { top } = useSafeAreaInsets();
    const { showActionSheetWithOptions } = useActionSheet();
    const { modalVisible, showModal, hideModal } = useModal();

    const [messages, setMessages] = useState<EmotionInterface[]>([]);
    const [modalContent, setModalContent] = useState<JSX.Element>(<></>);

    const loadMessages = useCallback(() => {
        getRequest<ResponseEmotionsGetInterface>(
            'emotions-messages/kudos'
        ).subscribe((response: ResponseEmotionsGetInterface) => {
            if (response?.status) {
                setMessages([...KUDOS_MESSAGES, ...(response?.data || [])]);
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
                    isKudos
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
                type={AddEmotionModalScreenEnum.KudosEmotionType}
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
        <View style={[KudosScreenStyle.container, { top }]}>
            <ScreenHeader
                title="Kudos"
                rightComponent={
                    <TouchableOpacity
                        activeOpacity={0.9}
                        hitSlop={10}
                        onPress={onPressAddEmotion}
                    >
                        <Text style={KudosScreenStyle.addButtonText}>
                            Add +
                        </Text>
                    </TouchableOpacity>
                }
            />
            <ScrollView contentContainerStyle={KudosScreenStyle.scrollView}>
                <View style={KudosScreenStyle.imageContainer}>
                    <FastImage
                        source={require('../../../assets/images/Kudos.png')}
                        style={KudosScreenStyle.image}
                    />
                </View>
                <View style={KudosScreenStyle.messagesContainer}>
                    {messages.map((value, index) => (
                        <MessageItem
                            key={value.id}
                            item={value}
                            index={index}
                            onPressMessage={() => onPressMessage(value)}
                            onItemLongPress={() => onItemLongPress(value)}
                        />
                    ))}
                </View>
            </ScrollView>
            <Modal
                isVisible={modalVisible}
                content={modalContent}
                onClose={hideModalAndKeyboard}
                style={KudosScreenStyle.modal}
            />
        </View>
    );
};

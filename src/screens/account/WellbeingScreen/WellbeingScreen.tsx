import React, { JSX, useCallback, useEffect, useState } from 'react';
import { Keyboard, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useActionSheet } from '@expo/react-native-action-sheet';
import FastImage from 'react-native-fast-image';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { useModal } from '@hooks/useModal';
import { EmotionInterface } from '@interfaces/general.interface';
import { ShareModalScreen } from '@components/home/ShareModalScreen/ShareModalScreen';
import { FriendsModalScreen } from '@components/friends/FriendsModalScreen/FriendsModalScreen';
import { Modal } from '@components/general/Modal/Modal';
import { WellbeingScreenStyle } from '@screens/account/WellbeingScreen/WellbeingScreen.style';
import { WELLBEING_MESSAGES } from '@screens/account/WellbeingScreen/WellbeingScreen.const';
import { deleteRequest, getRequest } from '@utils/Axios/Axios.service';
import {
    ResponseEmotionsGetInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import { AddEmotionModalScreen } from '@components/home/AddEmotionModalScreen/AddEmotionModalScreen';
import { AddEmotionModalScreenEnum } from '@components/home/AddEmotionModalScreen/AddEmotionModalScreen.enum';
import { MessageItem } from '@components/home/MessageItem/MessageItem';
import { AddButton } from '@components/general/AddButton/AddButton';

export const WellbeingScreen = (): JSX.Element => {
    const { top } = useSafeAreaInsets();
    const { showActionSheetWithOptions } = useActionSheet();
    const { modalVisible, showModal, hideModal } = useModal();

    const [messages, setMessages] = useState<EmotionInterface[]>([]);
    const [modalContent, setModalContent] = useState<JSX.Element>(<></>);

    const loadMessages = useCallback(() => {
        getRequest<ResponseEmotionsGetInterface>(
            'emotions-messages/wellbeing'
        ).subscribe((response: ResponseEmotionsGetInterface) => {
            if (response?.status) {
                setMessages([...WELLBEING_MESSAGES, ...(response?.data || [])]);
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
                type={AddEmotionModalScreenEnum.WellbeingEmotionType}
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
        <View style={[WellbeingScreenStyle.container, { top }]}>
            <ScreenHeader
                title="Wellbeing"
                rightComponent={<AddButton onPress={onPressAddEmotion} />}
            />
            <ScrollView contentContainerStyle={WellbeingScreenStyle.scrollView}>
                <View style={WellbeingScreenStyle.imageContainer}>
                    <FastImage
                        source={require('../../../assets/images/Wellbeing.png')}
                        style={WellbeingScreenStyle.image}
                    />
                </View>
                <Text style={WellbeingScreenStyle.description}>
                    {`There is not a problem you couldn't handle 💙`}
                </Text>
                <View style={WellbeingScreenStyle.messagesContainer}>
                    {messages.map((value, index) => (
                        <MessageItem
                            key={value.id}
                            index={index}
                            item={value}
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
                style={WellbeingScreenStyle.modal}
            />
        </View>
    );
};

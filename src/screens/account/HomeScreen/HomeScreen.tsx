import React, { useCallback, useEffect, useState } from 'react';
import {
    Keyboard,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useModal } from '@hooks/useModal';
import { useNotifications } from '@hooks/useNotifications';
import { HomeScreenStyle } from '@screens/account/HomeScreen/HomeScreen.style';
import { Modal } from '@components/general/Modal/Modal';
import { ShareModalScreen } from '@components/home/ShareModalScreen/ShareModalScreen';
import { FriendsModalScreen } from '@components/home/FriendsModalScreen/FriendsModalScreen';
import { HomeScreenHeader } from '@components/home/HomeScreenHeader/HomeScreenHeader';
import { AddEmotionModalScreen } from '@components/home/AddEmotionModalScreen/AddEmotionModalScreen';
import { ReducerProps } from '@store/index/index.props';
import { DATA } from '@screens/account/HomeScreen/HomeScreen.const';
import { EmotionInterface } from '@interfaces/general.interface';
import { deleteRequest, getRequest } from '@utils/Axios/Axios.service';
import {
    ResponseEmotionsGetInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import { MessagingService } from '@utils/general/MessagingService';
import { DirectEmotionModalScreen } from '@components/home/DirectEmotionModalScreen/DirectEmotionModalScreen';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';

export const HomeScreen = (): React.JSX.Element => {
    const { emotions } = useSelector((state: ReducerProps) => state.user);

    useNotifications();
    const { top } = useSafeAreaInsets();
    const { showActionSheetWithOptions } = useActionSheet();
    const { modalVisible, showModal, hideModal } = useModal();

    const [modalContent, setModalContent] = useState<React.JSX.Element>(<></>);

    const [data, setData] = useState<EmotionInterface[]>([]);

    useEffect(() => {
        setTimeout(() => {
            MessagingService.initMessaging().catch();
        }, 1000);
    }, []);

    useEffect(() => {
        setData([...DATA, ...(emotions || [])]);
    }, [emotions]);

    const loadEmotions = useCallback(() => {
        getRequest<ResponseEmotionsGetInterface>('emotions').subscribe(
            (response: ResponseEmotionsGetInterface) => {
                if (response?.status) {
                    setData([...DATA, ...(response?.data || [])]);
                }
            }
        );
    }, []);

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
                        loadEmotions();
                    }
                }
            );
        },
        [loadEmotions]
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
                    loadEmotions();
                    hideModalAndKeyboard();
                }}
            />
        );
        showModal();
    }, [hideModalAndKeyboard, loadEmotions, showModal]);

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
        <View style={[HomeScreenStyle.container, { paddingTop: top + 20 }]}>
            <HomeScreenHeader />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={HomeScreenStyle.scrollView}
                contentContainerStyle={HomeScreenStyle.scrollViewContainer}
            >
                <View style={HomeScreenStyle.contentView}>
                    {data.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            activeOpacity={0.7}
                            onPress={() => onItemPress(item)}
                            onLongPress={() => onItemLongPress(item)}
                            delayLongPress={150}
                            style={HomeScreenStyle.buttonView}
                        >
                            <Text style={HomeScreenStyle.buttonText}>
                                {item.emotion}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={onAddItemPress}
                        style={HomeScreenStyle.buttonView}
                    >
                        <Text style={HomeScreenStyle.buttonText}>Add +</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    hitSlop={20}
                    onPress={onDirectEmotionPress}
                    style={HomeScreenStyle.directEmotionButtonView}
                >
                    <Text style={HomeScreenStyle.directEmotionText}>
                        Direct sharing
                    </Text>
                    <Icon
                        name={IconEnum.DIRECT}
                        size={15}
                        style={HomeScreenStyle.directIcon}
                    />
                </TouchableOpacity>
            </ScrollView>
            <Modal
                isVisible={modalVisible}
                content={modalContent}
                onClose={hideModalAndKeyboard}
                style={HomeScreenStyle.modal}
            />
        </View>
    );
};

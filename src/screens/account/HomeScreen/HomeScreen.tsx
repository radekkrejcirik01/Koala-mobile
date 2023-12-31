import React, { useCallback, useEffect, useState } from 'react';
import {
    AppState,
    Keyboard,
    Platform,
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
import {
    EmotionInterface,
    ExpressionDataInterface
} from '@interfaces/general.interface';
import { deleteRequest, getRequest } from '@utils/Axios/Axios.service';
import {
    ResponseEmotionsGetInterface,
    ResponseExpressionsGetInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import { MessagingService } from '@utils/general/MessagingService';
import { DirectEmotionModalScreen } from '@components/home/DirectEmotionModalScreen/DirectEmotionModalScreen';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { StatusModalScreen } from '@components/home/StatusModalScreen/StatusModalScreen';
import { StatusReplyModalScreen } from '@components/home/StatusReplyModalScreen/StatusReplyModalScreen';
import { NotificationsService } from '@utils/general/NotificationsService';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

export const HomeScreen = (): React.JSX.Element => {
    const { emotions } = useSelector((state: ReducerProps) => state.user);

    useNotifications();
    const { top } = useSafeAreaInsets();
    const { showActionSheetWithOptions } = useActionSheet();
    const { modalVisible, showModal, hideModal } = useModal();

    const [modalContent, setModalContent] = useState<React.JSX.Element>(<></>);

    const [data, setData] = useState<EmotionInterface[]>([]);
    const [status, setStatus] = useState<string>();
    const [expressions, setExpressions] = useState<ExpressionDataInterface[]>(
        []
    );

    useEffect(() => {
        setTimeout(() => {
            MessagingService.initMessaging().catch();
        }, 2500);
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

    const loadExpressions = useCallback(() => {
        getRequest<ResponseExpressionsGetInterface>('expressions').subscribe(
            (response: ResponseExpressionsGetInterface) => {
                if (response?.status) {
                    setStatus(response?.expression);
                    setExpressions(response?.data);
                }
            }
        );
    }, []);

    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            (nextAppState) => {
                if (nextAppState === 'active') {
                    NotificationsService.getUnseenNotifications();
                    loadExpressions();
                    if (Platform.OS === 'ios') {
                        PushNotificationIOS.setApplicationIconBadgeNumber(0);
                    }
                }
            }
        );

        return () => {
            subscription.remove();
        };
    }, [loadExpressions]);

    const onStatusPress = useCallback(() => {
        setModalContent(
            <StatusModalScreen
                onPostPress={() => {
                    hideModal();

                    setTimeout(() => {
                        loadExpressions();
                    }, 500);
                }}
            />
        );
        showModal();
    }, [hideModal, loadExpressions, showModal]);

    const onStatusReply = useCallback(
        (item: ExpressionDataInterface) => {
            setModalContent(<StatusReplyModalScreen item={item} />);
            showModal();
        },
        [showModal]
    );

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
                horizontal
                style={HomeScreenStyle.expressionsScrollView}
            >
                <TouchableOpacity
                    activeOpacity={0.7}
                    hitSlop={10}
                    onPress={onStatusPress}
                    style={HomeScreenStyle.statusButtonView}
                >
                    <Text style={HomeScreenStyle.statusButtonText}>
                        {status || 'Status'}
                    </Text>
                </TouchableOpacity>
                {!!expressions &&
                    expressions.map((value) => (
                        <TouchableOpacity
                            key={value.userId + value.expression}
                            activeOpacity={0.7}
                            hitSlop={10}
                            onPress={() => onStatusReply(value)}
                            style={HomeScreenStyle.friendStatusButtonView}
                        >
                            <Text style={HomeScreenStyle.statusButtonText}>
                                {value.name} {value.expression}
                            </Text>
                        </TouchableOpacity>
                    ))}
            </ScrollView>
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

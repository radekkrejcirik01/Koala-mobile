import React, { useCallback, useEffect, useState } from 'react';
import {
    Alert,
    Keyboard,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSelector } from 'react-redux';
import { useModal } from '@hooks/useModal';
import { useAppState } from '@hooks/useAppState';
import { StatusItem } from '@components/home/StatusItem/StatusItem';
import { ToolBarStyle } from '@components/home/ToolBar/ToolBar.style';
import { FriendStatusInterface } from '@interfaces/general.interface';
import {
    deleteRequest,
    getRequest,
    postRequest
} from '@utils/Axios/Axios.service';
import {
    ResponseExpressionsGetInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import { Modal } from '@components/general/Modal/Modal';
import { StatusModalScreen } from '@components/home/StatusModalScreen/StatusModalScreen';
import { StatusReplyModalScreen } from '@components/home/StatusReplyModalScreen/StatusReplyModalScreen';
import {
    ExpressionPostInterface,
    StatusReplyMessagePostInterface
} from '@interfaces/post/Post.interface';
import { ReducerProps } from '@store/index/index.props';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { ToolBarProps } from '@components/home/ToolBar/ToolBar.props';

export const ToolBar = ({ onPressDirect }: ToolBarProps): React.JSX.Element => {
    const { id: userId } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const { modalVisible, showModal, hideModal } = useModal();

    const [status, setStatus] = useState<string>();
    const [friendsStatuses, setFriendsStatuses] = useState<
        FriendStatusInterface[]
    >([]);
    const [modalContent, setModalContent] = useState<React.JSX.Element>(<></>);

    const loadExpressions = useCallback(() => {
        getRequest<ResponseExpressionsGetInterface>('expressions').subscribe(
            (response: ResponseExpressionsGetInterface) => {
                if (response?.status) {
                    setStatus(response?.expression);
                    setFriendsStatuses(response?.data);
                }
            }
        );
    }, []);

    useAppState(loadExpressions);

    useEffect(() => {
        loadExpressions();
    }, [loadExpressions]);

    const hideModalAndKeyboard = useCallback(() => {
        Keyboard.dismiss();
        hideModal();
    }, [hideModal]);

    const postExpression = useCallback(
        (expression: string) => {
            hideModal();
            postRequest<ResponseInterface, ExpressionPostInterface>(
                'expression',
                {
                    userId,
                    expression
                }
            ).subscribe((response) => {
                if (response?.status === 'success') {
                    loadExpressions();
                }
            });
        },
        [hideModal, loadExpressions, userId]
    );

    const clearStatus = useCallback(() => {
        hideModal();
        deleteRequest<ResponseInterface>('expression').subscribe(
            (response: ResponseInterface) => {
                if (response?.status === 'success') {
                    loadExpressions();
                }
            }
        );
    }, [hideModal, loadExpressions]);

    const reply = useCallback(
        (item: FriendStatusInterface, message: string) => {
            hideModalAndKeyboard();

            postRequest<ResponseInterface, StatusReplyMessagePostInterface>(
                'status-reply-message',
                {
                    receiverId: item.userId,
                    message,
                    replyExpression: item.expression
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status === 'success') {
                    Alert.alert('Replied 👍');
                }
            });
        },
        [hideModalAndKeyboard]
    );

    const onStatusPress = useCallback(() => {
        setModalContent(
            <StatusModalScreen
                onPressExpression={postExpression}
                onPressClearStatus={clearStatus}
                expression={status}
            />
        );
        showModal();
    }, [clearStatus, postExpression, showModal, status]);

    const onStatusReply = useCallback(
        (item: FriendStatusInterface) => {
            setModalContent(
                <StatusReplyModalScreen
                    item={item}
                    onPressReply={(message: string) => reply(item, message)}
                />
            );
            showModal();
        },
        [reply, showModal]
    );

    return (
        <>
            <ScrollView
                horizontal
                style={ToolBarStyle.scrollView}
                contentContainerStyle={ToolBarStyle.scrollViewContainer}
            >
                <View style={ToolBarStyle.buttonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        hitSlop={10}
                        onPress={onPressDirect}
                        style={ToolBarStyle.button}
                    >
                        <Icon name={IconEnum.DIRECT} size={20} />
                    </TouchableOpacity>
                    <Text style={ToolBarStyle.buttonTitle}>Send</Text>
                </View>
                <StatusItem
                    onPress={onStatusPress}
                    name={status ? 'You' : 'Status'}
                    expression={status}
                />
                {friendsStatuses?.map((value) => (
                    <StatusItem
                        key={value.userId}
                        onPress={() => onStatusReply(value)}
                        name={value?.name}
                        expression={value?.expression}
                    />
                ))}
            </ScrollView>
            <Modal
                isVisible={modalVisible}
                content={modalContent}
                onClose={hideModalAndKeyboard}
                style={ToolBarStyle.modal}
            />
        </>
    );
};

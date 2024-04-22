import React, { useCallback, useEffect, useState } from 'react';
import {
    Keyboard,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useModal } from '@hooks/useModal';
import { useAppState } from '@hooks/useAppState';
import { ExpressionItem } from '@components/home/ExpressionItem/ExpressionItem';
import { ExpressionsStyle } from '@components/home/Expressions/Expressions.style';
import { ExpressionDataInterface } from '@interfaces/general.interface';
import { getRequest } from '@utils/Axios/Axios.service';
import { ResponseExpressionsGetInterface } from '@interfaces/response/Response.interface';
import { Modal } from '@components/general/Modal/Modal';
import { StatusModalScreen } from '@components/home/StatusModalScreen/StatusModalScreen';
import { StatusReplyModalScreen } from '@components/home/StatusReplyModalScreen/StatusReplyModalScreen';

export const Expressions = (): React.JSX.Element => {
    const { modalVisible, showModal, hideModal } = useModal();

    const [status, setStatus] = useState<string>();
    const [expressions, setExpressions] = useState<ExpressionDataInterface[]>(
        []
    );
    const [modalContent, setModalContent] = useState<React.JSX.Element>(<></>);

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

    useAppState(loadExpressions);

    useEffect(() => {
        loadExpressions();
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

    const hideModalAndKeyboard = useCallback(() => {
        Keyboard.dismiss();
        hideModal();
    }, [hideModal]);

    return (
        <View style={ExpressionsStyle.container}>
            <ScrollView horizontal style={ExpressionsStyle.scrollView}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    hitSlop={10}
                    onPress={onStatusPress}
                    style={ExpressionsStyle.statusButtonView}
                >
                    <Text style={ExpressionsStyle.statusButtonText}>
                        {status || 'Status'}
                    </Text>
                </TouchableOpacity>
                {!!expressions &&
                    expressions.map((value) => (
                        <ExpressionItem
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
                style={ExpressionsStyle.modal}
            />
        </View>
    );
};

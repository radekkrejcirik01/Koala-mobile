import React, { useCallback, useRef, useState } from 'react';
import { Alert, Keyboard, ScrollView, Text, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSending } from '@hooks/useSending';
import { useModal } from '@hooks/useModal';
import { CheckOnScreenStyle } from '@screens/account/CheckOnScreen/CheckOnScreen.style';
import COLORS from '@constants/COLORS';
import { filterSelected } from '@functions/filterSelected';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { CheckOnMessagePostInterface } from '@interfaces/post/Post.interface';
import { MessagesStyle } from '@components/home/Messages/Messages.style';
import { Modal } from '@components/general/Modal/Modal';
import { FriendsModalScreen } from '@components/friends/FriendsModalScreen/FriendsModalScreen';
import { Send } from '@components/home/Send/Send';

export const CheckOnScreen = () => {
    const { top } = useSafeAreaInsets();
    const { modalVisible, showModal, hideModal } = useModal();
    const { sending, sent, setSending, setSent } = useSending();

    const [message, setMessage] = useState<string>('How is it going today?');

    const selectedFriends = useRef<number[]>([]);

    const onFriendSelect = (id: number) => {
        setSent(false);

        selectedFriends.current = filterSelected(selectedFriends.current, id);
    };

    const send = useCallback(() => {
        const selected = selectedFriends.current;

        if (!message?.length) {
            Alert.alert('Please write a message first');
            return;
        }
        if (!selected.length) {
            Alert.alert('Please select a friend first');
            return;
        }

        setSending(true);

        postRequest<ResponseInterface, CheckOnMessagePostInterface>(
            'check-on-message',
            {
                ids: selected,
                message
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status === 'success') {
                setSending(false);
                setSent(true);

                selectedFriends.current = [];
            }
        });
    }, [message, setSending, setSent]);

    const hideModalAndKeyboard = useCallback(() => {
        Keyboard.dismiss();
        hideModal();
    }, [hideModal]);

    return (
        <>
            <ScrollView
                style={{ marginTop: top }}
                contentContainerStyle={CheckOnScreenStyle.contentContainer}
            >
                <Text style={CheckOnScreenStyle.titleText}>Check on</Text>
                <Text style={CheckOnScreenStyle.descriptionText}>
                    Ask your friends how they are doing
                </Text>
                <TextInput
                    value={message}
                    onChangeText={setMessage}
                    autoCorrect={false}
                    selectionColor={COLORS.BUTTON_BLUE}
                    style={CheckOnScreenStyle.input}
                />
                <Send
                    onFriendSelect={onFriendSelect}
                    onAddFriendPress={showModal}
                    onPressSend={send}
                    sending={sending}
                    sent={sent}
                    style={CheckOnScreenStyle.send}
                />
            </ScrollView>
            <Modal
                isVisible={modalVisible}
                content={<FriendsModalScreen />}
                onClose={hideModalAndKeyboard}
                style={MessagesStyle.modal}
            />
        </>
    );
};

import React, { JSX, useCallback, useRef } from 'react';
import { Alert, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSending } from '@hooks/useSending';
import {
    ShareModalScreenDefaultProps,
    ShareModalScreenProps
} from '@components/home/ShareModalScreen/ShareModalScreen.props';
import { ShareModalScreenStyle } from '@components/home/ShareModalScreen/ShareModalScreen.style';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { EmotionMessagePostInterface } from '@interfaces/post/Post.interface';
import { CanHelp } from '@components/home/CanHelp/CanHelp';
import { filterSelected } from '@functions/filterSelected';
import { Send } from '@components/home/Send/Send';

export const ShareModalScreen = ({
    item,
    onAddFriendPress,
    isKudos
}: ShareModalScreenProps): JSX.Element => {
    const { bottom } = useSafeAreaInsets();
    const { sending, sent, setSending, setSent } = useSending();

    const selectedFriends = useRef<number[]>([]);

    const onFriendSelect = (id: number) => {
        setSent(false);

        selectedFriends.current = filterSelected(selectedFriends.current, id);
    };

    const send = useCallback(() => {
        const selected = selectedFriends.current;

        if (!selected.length) {
            Alert.alert('Please select a friend first');
            return;
        }

        setSending(true);

        let endpoint = 'emotion-message';
        if (isKudos) {
            endpoint += '/kudos';
        }

        postRequest<ResponseInterface, EmotionMessagePostInterface>(endpoint, {
            ids: selected,
            message: item.message
        }).subscribe((response: ResponseInterface) => {
            if (response?.status === 'success') {
                setSending(false);
                setSent(true);

                selectedFriends.current = [];
            }
        });
    }, [isKudos, item.message, setSending, setSent]);

    return (
        <View
            style={[
                ShareModalScreenStyle.container,
                {
                    paddingBottom: bottom + 10
                }
            ]}
        >
            <Text style={ShareModalScreenStyle.messageText}>
                {item.message}
            </Text>
            <View style={ShareModalScreenStyle.content}>
                <CanHelp tip1={item?.tip1} tip2={item?.tip2} />
                <Send
                    onFriendSelect={onFriendSelect}
                    onAddFriendPress={onAddFriendPress}
                    onPressSend={send}
                    sending={sending}
                    sent={sent}
                    style={ShareModalScreenStyle.send}
                />
            </View>
        </View>
    );
};

ShareModalScreen.defaultProps = ShareModalScreenDefaultProps;

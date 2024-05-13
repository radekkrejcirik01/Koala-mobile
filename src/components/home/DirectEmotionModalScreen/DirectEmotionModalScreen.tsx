import React, { JSX, useCallback, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFriends } from '@hooks/useFriends';
import { useSending } from '@hooks/useSending';
import { ShareFriendItem } from '@components/home/ShareFriendItem/ShareFriendItem';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { EmotionMessagePostInterface } from '@interfaces/post/Post.interface';
import COLORS from '@constants/COLORS';
import { DirectEmotionModalScreenProps } from '@components/home/DirectEmotionModalScreen/DirectEmotionModalScreen.props';
import { DirectEmotionModalScreenStyle } from '@components/home/DirectEmotionModalScreen/DirectEmotionModalScreen.style';
import { AddFriendButton } from '@components/home/AddFriendButton/AddFriendButton';
import { filterSelected } from '@functions/filterSelected';

export const DirectEmotionModalScreen = ({
    onAddFriendPress
}: DirectEmotionModalScreenProps): JSX.Element => {
    const { bottom } = useSafeAreaInsets();

    const [loaded, setLoaded] = useState<boolean>(false);
    const [message, setMessage] = useState<string>();

    const { friends } = useFriends(() => setLoaded(true));
    const { sending, sent, setSending, setSent } = useSending();

    const selectedFriends = useRef<number[]>([]);

    const onFriendSelect = (id: number) => {
        selectedFriends.current = filterSelected(selectedFriends.current, id);
    };

    const onSend = useCallback(() => {
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

        postRequest<ResponseInterface, EmotionMessagePostInterface>(
            'emotion-message',
            {
                ids: selected,
                message
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status === 'success') {
                setSending(false);
                setSent(true);

                setMessage('');
            }
        });
    }, [message, setSending, setSent]);

    return (
        <View
            style={[
                DirectEmotionModalScreenStyle.container,
                {
                    paddingBottom: bottom || 10
                }
            ]}
        >
            <TextInput
                multiline
                placeholder="What happened?"
                autoFocus
                autoCorrect={false}
                value={message}
                onChangeText={setMessage}
                selectionColor={COLORS.BUTTON_BLUE}
                style={DirectEmotionModalScreenStyle.input}
            />
            <View style={DirectEmotionModalScreenStyle.content}>
                <View style={DirectEmotionModalScreenStyle.supportView}>
                    <Text style={DirectEmotionModalScreenStyle.supportText} />
                </View>
                <View style={DirectEmotionModalScreenStyle.sendContainer}>
                    {loaded ? (
                        <>
                            <View
                                style={DirectEmotionModalScreenStyle.selectView}
                            >
                                <>
                                    {friends?.length &&
                                        friends?.map((value) => (
                                            <ShareFriendItem
                                                key={value.username}
                                                item={{
                                                    name: value.name,
                                                    username: value.username
                                                }}
                                                onSelect={() =>
                                                    onFriendSelect(value.id)
                                                }
                                                sent={sent}
                                            />
                                        ))}
                                </>
                                <AddFriendButton
                                    size={45}
                                    onPress={onAddFriendPress}
                                    style={
                                        DirectEmotionModalScreenStyle.addFriendButton
                                    }
                                />
                            </View>
                            {friends?.length ? (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    disabled={sent}
                                    onPress={onSend}
                                    style={
                                        DirectEmotionModalScreenStyle.shareButtonView
                                    }
                                >
                                    {sending ? (
                                        <ActivityIndicator
                                            color={COLORS.WHITE}
                                        />
                                    ) : (
                                        <Text
                                            style={
                                                DirectEmotionModalScreenStyle.shareButtonText
                                            }
                                        >
                                            {sent ? 'Received' : 'Share'}
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={onAddFriendPress}
                                >
                                    <Text
                                        adjustsFontSizeToFit
                                        style={
                                            DirectEmotionModalScreenStyle.noAddedDescription
                                        }
                                    >
                                        Add friends to share
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </>
                    ) : (
                        <ActivityIndicator color={COLORS.BUTTON_BLUE} />
                    )}
                </View>
            </View>
        </View>
    );
};

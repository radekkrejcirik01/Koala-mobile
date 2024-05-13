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
import { ShareFriendItem } from '@components/home/ShareFriendItem/ShareFriendItem';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { EmotionMessagePostInterface } from '@interfaces/post/Post.interface';
import COLORS from '@constants/COLORS';
import { DirectEmotionModalScreenProps } from '@components/home/DirectEmotionModalScreen/DirectEmotionModalScreen.props';
import { DirectEmotionModalScreenStyle } from '@components/home/DirectEmotionModalScreen/DirectEmotionModalScreen.style';
import { AddFriendButton } from '@components/home/AddFriendButton/AddFriendButton';

export const DirectEmotionModalScreen = ({
    onAddFriendPress
}: DirectEmotionModalScreenProps): JSX.Element => {
    const { bottom } = useSafeAreaInsets();

    const [loaded, setLoaded] = useState<boolean>(false);
    const [message, setMessage] = useState<string>();
    const [sending, setSending] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);

    const selectedFriends = useRef<number[]>([]);

    const { friends } = useFriends(() => setLoaded(true));

    const onFriendSelect = (id: number) => {
        if (selectedFriends?.current.includes(id)) {
            selectedFriends.current = selectedFriends.current.filter(
                (value) => value !== id
            );
        } else {
            selectedFriends.current.push(id);
        }
    };

    const onSend = useCallback(() => {
        if (!message?.length) {
            Alert.alert('Please write a message first');
            return;
        }
        if (!selectedFriends.current?.length) {
            Alert.alert('Please select a friend first');
            return;
        }

        setSending(true);

        postRequest<ResponseInterface, EmotionMessagePostInterface>(
            'emotion-message',
            {
                ids: selectedFriends.current,
                message
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status === 'success') {
                setSending(false);
                setSent(true);
            }
        });
    }, [message]);

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

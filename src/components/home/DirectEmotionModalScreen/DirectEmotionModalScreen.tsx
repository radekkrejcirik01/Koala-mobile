import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ShareFriendItem } from '@components/home/ShareFriendItem/ShareFriendItem';
import { UserInterface } from '@interfaces/general.interface';
import { getRequest, postRequest } from '@utils/Axios/Axios.service';
import {
    ResponseFriendsGetInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import { EmotionNotificationPostInterface } from '@interfaces/post/Post.interface';
import { ReducerProps } from '@store/index/index.props';
import COLORS from '@constants/COLORS';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { DirectEmotionModalScreenProps } from '@components/home/DirectEmotionModalScreen/DirectEmotionModalScreen.props';
import { DirectEmotionModalScreenStyle } from '@components/home/DirectEmotionModalScreen/DirectEmotionModalScreen.style';

export const DirectEmotionModalScreen = ({
    onAddFriendPress
}: DirectEmotionModalScreenProps): React.JSX.Element => {
    const { name } = useSelector((state: ReducerProps) => state.user.user);

    const { bottom } = useSafeAreaInsets();

    const [loaded, setLoaded] = useState<boolean>(false);
    const [friends, setFriends] = useState<UserInterface[]>([]);
    const [message, setMessage] = useState<string>();
    const [sending, setSending] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);

    const selectedFriends = useRef<string[]>([]);

    const loadFriends = () => {
        getRequest<ResponseFriendsGetInterface>('friends').subscribe(
            (response: ResponseFriendsGetInterface) => {
                if (response?.status) {
                    setFriends(response?.data);
                    setLoaded(true);
                }
            }
        );
    };

    useEffect(() => {
        loadFriends();
    }, []);

    const onFriendSelect = (username: string) => {
        if (selectedFriends?.current.includes(username)) {
            selectedFriends.current = selectedFriends.current.filter(
                (value) => value !== username
            );
        } else {
            selectedFriends.current.push(username);
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
        postRequest<ResponseInterface, EmotionNotificationPostInterface>(
            'emotion-notification',
            {
                receivers: selectedFriends.current,
                name,
                message
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                setSending(false);
                setSent(true);
            }
        });
    }, [message, name]);

    return (
        <View
            style={[
                DirectEmotionModalScreenStyle.container,
                {
                    paddingBottom: bottom + 10
                }
            ]}
        >
            <TextInput
                multiline
                placeholder="THE EMOTION"
                onChangeText={setMessage}
                selectionColor={COLORS.BUTTON_BLUE}
                style={DirectEmotionModalScreenStyle.input}
            />
            <View style={DirectEmotionModalScreenStyle.content}>
                <View style={DirectEmotionModalScreenStyle.supportView}>
                    <Text style={DirectEmotionModalScreenStyle.supportText}>
                        You can handle this we believe in you 🫶
                    </Text>
                </View>
                <View style={DirectEmotionModalScreenStyle.sendContainer}>
                    {loaded ? (
                        <>
                            <View
                                style={DirectEmotionModalScreenStyle.selectView}
                            >
                                {friends?.length ? (
                                    friends?.map((value) => (
                                        <ShareFriendItem
                                            key={value.username}
                                            item={{
                                                name: value.name,
                                                username: value.username
                                            }}
                                            onSelect={() =>
                                                onFriendSelect(value.username)
                                            }
                                            sent={sent}
                                        />
                                    ))
                                ) : (
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={onAddFriendPress}
                                        style={
                                            DirectEmotionModalScreenStyle.addButtonView
                                        }
                                    >
                                        <Icon name={IconEnum.PLUS} size={12} />
                                    </TouchableOpacity>
                                )}
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

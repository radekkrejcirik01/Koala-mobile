import React, { JSX, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFriends } from '@hooks/useFriends';
import { ShareModalScreenProps } from '@components/home/ShareModalScreen/ShareModalScreen.props';
import { ShareModalScreenStyle } from '@components/home/ShareModalScreen/ShareModalScreen.style';
import { ShareFriendItem } from '@components/home/ShareFriendItem/ShareFriendItem';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { EmotionMessagePostInterface } from '@interfaces/post/Post.interface';
import COLORS from '@constants/COLORS';
import { CanHelp } from '@components/home/CanHelp/CanHelp';
import { AddFriendButton } from '@components/home/AddFriendButton/AddFriendButton';

export const ShareModalScreen = ({
    item,
    onAddFriendPress
}: ShareModalScreenProps): JSX.Element => {
    const { bottom } = useSafeAreaInsets();

    const [loaded, setLoaded] = useState<boolean>(false);
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

    const onSend = () => {
        if (selectedFriends.current?.length) {
            setSending(true);
            postRequest<ResponseInterface, EmotionMessagePostInterface>(
                'emotion-message',
                {
                    ids: selectedFriends.current,
                    message: item.message
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status === 'success') {
                    setSending(false);
                    setSent(true);
                }
            });
        } else {
            Alert.alert('Please select a friend first');
        }
    };

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
                <View style={ShareModalScreenStyle.sendContainer}>
                    {loaded ? (
                        <>
                            <View style={ShareModalScreenStyle.selectView}>
                                <>
                                    {!!friends?.length &&
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
                                        ShareModalScreenStyle.addFriendButton
                                    }
                                />
                            </View>
                            {friends?.length ? (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    disabled={sent}
                                    onPress={onSend}
                                    style={
                                        ShareModalScreenStyle.shareButtonView
                                    }
                                >
                                    {sending ? (
                                        <ActivityIndicator
                                            color={COLORS.WHITE}
                                        />
                                    ) : (
                                        <Text
                                            style={
                                                ShareModalScreenStyle.shareButtonText
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
                                            ShareModalScreenStyle.noAddedDescription
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

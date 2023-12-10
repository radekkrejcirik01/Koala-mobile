import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ShareModalScreenProps } from '@components/home/ShareModalScreen/ShareModalScreen.props';
import { ShareModalScreenStyle } from '@components/home/ShareModalScreen/ShareModalScreen.style';
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

export const ShareModalScreen = ({
    item,
    onAddFriendPress
}: ShareModalScreenProps): React.JSX.Element => {
    const { id: userId, name } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const { bottom } = useSafeAreaInsets();

    const [loaded, setLoaded] = useState<boolean>(false);
    const [friends, setFriends] = useState<UserInterface[]>([]);
    const [sending, setSending] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);

    const selectedFriends = useRef<number[]>([]);

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
            postRequest<ResponseInterface, EmotionNotificationPostInterface>(
                'emotion-notification',
                {
                    senderId: userId,
                    receiversIds: selectedFriends.current,
                    name,
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
                {(!!item?.tip1 || !!item?.tip2) && (
                    <View style={ShareModalScreenStyle.tipsView}>
                        <Text style={ShareModalScreenStyle.tipsTitleText}>
                            Is helping:
                        </Text>
                        {!!item?.tip1 && (
                            <View
                                style={[
                                    ShareModalScreenStyle.marginTop10,
                                    ShareModalScreenStyle.row
                                ]}
                            >
                                <Text style={ShareModalScreenStyle.colorBlack}>
                                    👉
                                </Text>
                                <Text
                                    style={[
                                        ShareModalScreenStyle.marginLeft2,
                                        ShareModalScreenStyle.colorBlack
                                    ]}
                                >
                                    {item.tip1}
                                </Text>
                            </View>
                        )}
                        {!!item?.tip2 && (
                            <View
                                style={[
                                    ShareModalScreenStyle.marginTop5,
                                    ShareModalScreenStyle.row
                                ]}
                            >
                                <Text style={ShareModalScreenStyle.colorBlack}>
                                    👉
                                </Text>
                                <Text
                                    style={[
                                        ShareModalScreenStyle.marginLeft2,
                                        ShareModalScreenStyle.colorBlack
                                    ]}
                                >
                                    {item.tip2}
                                </Text>
                            </View>
                        )}
                    </View>
                )}
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
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={onAddFriendPress}
                                    style={ShareModalScreenStyle.addButtonView}
                                >
                                    <Icon name={IconEnum.PLUS} size={12} />
                                </TouchableOpacity>
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

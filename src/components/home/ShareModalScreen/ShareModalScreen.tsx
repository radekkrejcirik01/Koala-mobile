import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
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
}: ShareModalScreenProps): JSX.Element => {
    const { name } = useSelector((state: ReducerProps) => state.user.user);

    const { bottom } = useSafeAreaInsets();

    const [loaded, setLoaded] = useState<boolean>(false);
    const [friends, setFriends] = useState<UserInterface[]>([]);
    const [shareDisabled, setShareDisabled] = useState<boolean>(true);
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
        // 300 ms open modal time
        setTimeout(() => {
            loadFriends();
        }, 300);
    }, []);

    const onFriendSelect = (username: string) => {
        if (selectedFriends?.current.includes(username)) {
            selectedFriends.current = selectedFriends.current.filter(
                (value) => value !== username
            );
        } else {
            selectedFriends.current.push(username);
        }

        setShareDisabled(!selectedFriends.current?.length);
    };

    const onSend = () => {
        if (selectedFriends.current?.length) {
            setSending(true);
            postRequest<ResponseInterface, EmotionNotificationPostInterface>(
                'emotion-notification',
                {
                    receivers: selectedFriends.current,
                    name,
                    message: item.message
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) {
                    setSending(false);
                    setSent(true);
                }
            });
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
                            Can help:
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
                                {friends?.length ? (
                                    friends?.map((value, index) => {
                                        // Center third item in the middle
                                        if (
                                            friends?.length === 5 &&
                                            index === 2
                                        ) {
                                            return (
                                                <View
                                                    key={value.username}
                                                    style={
                                                        ShareModalScreenStyle.middleView
                                                    }
                                                >
                                                    <ShareFriendItem
                                                        item={{
                                                            name: value.name,
                                                            username:
                                                                value.username
                                                        }}
                                                        onSelect={() =>
                                                            onFriendSelect(
                                                                value.username
                                                            )
                                                        }
                                                        sent={sent}
                                                    />
                                                </View>
                                            );
                                        }
                                        return (
                                            <ShareFriendItem
                                                key={value.username}
                                                item={{
                                                    name: value.name,
                                                    username: value.username
                                                }}
                                                onSelect={() =>
                                                    onFriendSelect(
                                                        value.username
                                                    )
                                                }
                                                sent={sent}
                                            />
                                        );
                                    })
                                ) : (
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={onAddFriendPress}
                                        style={
                                            ShareModalScreenStyle.addButtonView
                                        }
                                    >
                                        <Icon name={IconEnum.PLUS} size={12} />
                                    </TouchableOpacity>
                                )}
                            </View>
                            {friends?.length ? (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    disabled={shareDisabled || sent}
                                    onPress={onSend}
                                    style={[
                                        ShareModalScreenStyle.shareButtonView,
                                        shareDisabled && {
                                            opacity: 0.7
                                        }
                                    ]}
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

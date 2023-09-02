import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
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

export const ShareModalScreen = ({
    item
}: ShareModalScreenProps): JSX.Element => {
    const { name } = useSelector((state: ReducerProps) => state.user.user);

    const { bottom } = useSafeAreaInsets();

    const [friends, setFriends] = useState<UserInterface[]>([]);

    const selectedFriends = useRef<string[]>([]);

    useEffect(() => {
        getRequest<ResponseFriendsGetInterface>('friends').subscribe(
            (response: ResponseFriendsGetInterface) => {
                if (response?.status) {
                    setFriends(response?.data);
                }
            }
        );
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

    const onSend = () => {
        if (selectedFriends.current?.length) {
            postRequest<ResponseInterface, EmotionNotificationPostInterface>(
                'emotion-notification',
                {
                    receivers: selectedFriends.current,
                    name,
                    message: item.description
                }
            ).subscribe((response: ResponseInterface) => {
                if (response?.status) {
                    // Alert.alert(response?.message);
                }
            });
        }
    };

    return (
        <View
            style={[
                {
                    paddingBottom: bottom
                },
                ShareModalScreenStyle.container
            ]}
        >
            <Text style={ShareModalScreenStyle.messageText}>
                {item.description}
            </Text>
            <View style={ShareModalScreenStyle.content}>
                <View style={ShareModalScreenStyle.tipsView}>
                    <Text style={ShareModalScreenStyle.tipsTitleText}>
                        Quick tips:
                    </Text>
                    <Text style={ShareModalScreenStyle.marginTop10}>
                        👉 {item.tip1}
                    </Text>
                    <Text style={ShareModalScreenStyle.marginTop5}>
                        👉 {item.tip2}
                    </Text>
                </View>
                <View style={ShareModalScreenStyle.sendContainer}>
                    <View style={ShareModalScreenStyle.selectView}>
                        {friends?.map((value) => (
                            <ShareFriendItem
                                key={value.username}
                                item={{
                                    name: value.name,
                                    username: value.username
                                }}
                                onPress={() => onFriendSelect(value.username)}
                            />
                        ))}
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={onSend}
                        style={ShareModalScreenStyle.shareButtonView}
                    >
                        <Text style={ShareModalScreenStyle.shareButtonText}>
                            Send
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

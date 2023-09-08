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
    item,
    onAddFriendPress
}: ShareModalScreenProps): JSX.Element => {
    const { name } = useSelector((state: ReducerProps) => state.user.user);

    const { bottom } = useSafeAreaInsets();

    const [loaded, setLoaded] = useState<boolean>(false);
    const [friends, setFriends] = useState<UserInterface[]>([]);
    const [sent, setSent] = useState<boolean>(false);

    const selectedFriends = useRef<string[]>([]);

    useEffect(() => {
        getRequest<ResponseFriendsGetInterface>('friends').subscribe(
            (response: ResponseFriendsGetInterface) => {
                if (response?.status) {
                    setFriends(response?.data);
                    setLoaded(true);
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
                    {loaded && (
                        <View style={ShareModalScreenStyle.selectView}>
                            {friends?.length
                                ? friends?.map((value) => (
                                      <ShareFriendItem
                                          key={value.username}
                                          item={{
                                              name: value.name,
                                              username: value.username
                                          }}
                                          onPress={() =>
                                              onFriendSelect(value.username)
                                          }
                                          sent={sent}
                                      />
                                  ))
                                : [...Array(3)].map((value, index) => (
                                      <TouchableOpacity
                                          key={value + index.toString()}
                                          activeOpacity={0.9}
                                          onPress={onAddFriendPress}
                                          style={
                                              ShareModalScreenStyle.addButtonView
                                          }
                                      >
                                          <Text
                                              style={
                                                  ShareModalScreenStyle.addButtonText
                                              }
                                          >
                                              Add
                                          </Text>
                                      </TouchableOpacity>
                                  ))}
                        </View>
                    )}
                    {loaded && (
                        <>
                            {friends?.length ? (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    disabled={sent}
                                    onPress={onSend}
                                    style={
                                        ShareModalScreenStyle.shareButtonView
                                    }
                                >
                                    <Text
                                        style={
                                            ShareModalScreenStyle.shareButtonText
                                        }
                                    >
                                        Share
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={onAddFriendPress}
                                >
                                    <Text
                                        style={
                                            ShareModalScreenStyle.noAddedDescription
                                        }
                                    >
                                        Add friends to share
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </>
                    )}
                </View>
            </View>
        </View>
    );
};

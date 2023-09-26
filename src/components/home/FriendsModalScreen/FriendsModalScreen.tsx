import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useSelector } from 'react-redux';
import { FriendsModalScreenStyle } from '@components/home/FriendsModalScreen/FriendsModalScreen.style';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import {
    getRequest,
    postRequest,
    putRequest
} from '@utils/Axios/Axios.service';
import {
    ResponseFriendsGetInterface,
    ResponseInterface
} from '@interfaces/response/Response.interface';
import { InvitePostInterface } from '@interfaces/post/Post.interface';
import { UserInterface } from '@interfaces/general.interface';
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';
import { NotificationsScreenStyle } from '@screens/account/NotificationsScreen/NotificationsScreen.style';
import COLORS from '@constants/COLORS';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { ReducerProps } from '@store/index/index.props';

export const FriendsModalScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const [friends, setFriends] = useState<UserInterface[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [adding, setAdding] = useState<boolean>(false);
    const [inviteUsername, setInviteUsername] = useState<string>();
    const [showRequests, setShowRequests] = useState<boolean>(false);
    const [friendRequests, setFriendRequests] = useState<UserInterface[]>([]);
    const [posting, setPosting] = useState<boolean>(false);

    const getFriendRequests = () => {
        getRequest<ResponseFriendsGetInterface>('friend-requests').subscribe(
            (response: ResponseFriendsGetInterface) => {
                if (response?.status) {
                    setFriendRequests(response?.data);
                }
            }
        );
    };

    const loadFriends = useCallback(() => {
        getRequest<ResponseFriendsGetInterface>('friends').subscribe(
            (response: ResponseFriendsGetInterface) => {
                if (response?.status) {
                    setFriends(response?.data);
                    getFriendRequests();

                    setLoaded(true);
                }
            }
        );
    }, []);

    useEffect(() => {
        // 300 ms modal opening time
        setTimeout(() => {
            loadFriends();
        }, 300);
    }, [loadFriends]);

    const sendInvite = useCallback(() => {
        setPosting(true);

        postRequest<ResponseInterface, InvitePostInterface>('invite', {
            receiver: inviteUsername
        }).subscribe((response: ResponseInterface) => {
            setPosting(false);

            if (response?.status) {
                Alert.alert(response.message);
            }
        });
    }, [inviteUsername]);

    const acceptInvite = (user: string) => {
        setPosting(true);

        putRequest<ResponseInterface, InvitePostInterface>('invite', {
            receiver: user
        }).subscribe((response: ResponseInterface) => {
            setPosting(false);

            if (response?.status) {
                if (response?.message) {
                    Alert.alert(response.message);
                    return;
                }

                loadFriends();
                setTimeout(() => {
                    setShowRequests(false);
                }, 400);
            }
        });
    };

    if (adding) {
        return (
            <View style={FriendsModalScreenStyle.inviteContainer}>
                <Text style={FriendsModalScreenStyle.titleText}>
                    Invite friend
                </Text>
                <TextInput
                    autoFocus
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="username"
                    onChangeText={setInviteUsername}
                    style={FriendsModalScreenStyle.input}
                />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'position' : 'height'}
                    keyboardVerticalOffset={15}
                >
                    <TouchableOpacity
                        activeOpacity={0.9}
                        disabled={!inviteUsername}
                        onPress={sendInvite}
                        style={FriendsModalScreenStyle.sendButtonView}
                    >
                        {posting ? (
                            <ActivityIndicator color={COLORS.WHITE} />
                        ) : (
                            <Text
                                style={FriendsModalScreenStyle.sendButtonText}
                            >
                                Send
                            </Text>
                        )}
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        );
    }

    if (showRequests) {
        return (
            <View style={FriendsModalScreenStyle.container}>
                <Text style={FriendsModalScreenStyle.titleText}>
                    Friend requests
                </Text>
                {friendRequests?.length ? (
                    <View style={FriendsModalScreenStyle.friendRequestsView}>
                        {friendRequests?.map((value) => (
                            <View
                                key={value.username}
                                style={
                                    FriendsModalScreenStyle.friendRequestItemView
                                }
                            >
                                <View
                                    style={
                                        FriendsModalScreenStyle.friendRequestItemContent
                                    }
                                >
                                    <ProfilePhoto
                                        name={value.username}
                                        size={45}
                                    />
                                    <Text
                                        style={
                                            FriendsModalScreenStyle.friendRequestItemUsernameText
                                        }
                                    >
                                        {value.username}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => acceptInvite(value.username)}
                                    style={
                                        FriendsModalScreenStyle.friendRequestItemAcceptButtonView
                                    }
                                >
                                    {posting ? (
                                        <ActivityIndicator
                                            color={COLORS.WHITE}
                                            size="small"
                                        />
                                    ) : (
                                        <Text
                                            style={
                                                FriendsModalScreenStyle.friendRequestItemAcceptButtonText
                                            }
                                        >
                                            Accept
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                ) : (
                    <Text style={NotificationsScreenStyle.listEmptyText}>
                        No friend requests at the moment
                    </Text>
                )}
            </View>
        );
    }

    return (
        <View style={FriendsModalScreenStyle.container}>
            <Text style={FriendsModalScreenStyle.titleText}>Friends</Text>
            <TouchableOpacity onPress={() => setShowRequests(true)}>
                <Text style={FriendsModalScreenStyle.requestsText}>
                    Requests{' '}
                    {!!friendRequests?.length && `(${friendRequests?.length})`}
                </Text>
            </TouchableOpacity>
            <View style={FriendsModalScreenStyle.profilesView}>
                {loaded ? (
                    <>
                        {friends?.length > 0 ? (
                            <View style={FriendsModalScreenStyle.profileView}>
                                <ProfilePhoto
                                    name={friends[0].name}
                                    size={75}
                                />
                                <Text style={FriendsModalScreenStyle.nameText}>
                                    {friends[0].name}
                                </Text>
                            </View>
                        ) : (
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => setAdding(true)}
                                style={FriendsModalScreenStyle.addView}
                            >
                                <Icon name={IconEnum.PLUS} size={14} />
                            </TouchableOpacity>
                        )}
                        {friends?.length > 1 ? (
                            <View style={FriendsModalScreenStyle.profileView}>
                                <ProfilePhoto
                                    name={friends[1].name}
                                    size={75}
                                />
                                <Text style={FriendsModalScreenStyle.nameText}>
                                    {friends[1].name}
                                </Text>
                            </View>
                        ) : (
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => setAdding(true)}
                                style={FriendsModalScreenStyle.addView}
                            >
                                <Icon name={IconEnum.PLUS} size={14} />
                            </TouchableOpacity>
                        )}
                        {friends?.length > 2 ? (
                            <View style={FriendsModalScreenStyle.profileView}>
                                <ProfilePhoto
                                    name={friends[2].name}
                                    size={75}
                                />
                                <Text style={FriendsModalScreenStyle.nameText}>
                                    {friends[2].name}
                                </Text>
                            </View>
                        ) : (
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => setAdding(true)}
                                style={FriendsModalScreenStyle.addView}
                            >
                                <Icon name={IconEnum.PLUS} size={14} />
                            </TouchableOpacity>
                        )}
                    </>
                ) : (
                    <ActivityIndicator
                        color={COLORS.BUTTON_BLUE}
                        style={FriendsModalScreenStyle.activityIndicator}
                    />
                )}
            </View>
            {loaded && (
                <Text style={FriendsModalScreenStyle.usernameDescriptionText}>
                    Your username is {username}
                </Text>
            )}
        </View>
    );
};

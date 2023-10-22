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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FriendsModalScreenStyle } from '@components/home/FriendsModalScreen/FriendsModalScreen.style';
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
import COLORS from '@constants/COLORS';
import { ReducerProps } from '@store/index/index.props';
import { MessagingService } from '@utils/general/MessagingService';
import { FriendItem } from '@components/friends/FriendItem/FriendItem';
import { FriendRequestItem } from '@components/friends/FriendRequestItem/FriendRequestItem';

export const FriendsModalScreen = (): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const { bottom } = useSafeAreaInsets();

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
            MessagingService.initMessaging().catch();
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
            <View
                style={[
                    FriendsModalScreenStyle.container,
                    FriendsModalScreenStyle.flexStart
                ]}
            >
                <Text style={FriendsModalScreenStyle.titleText}>
                    Friend requests
                </Text>
                {friendRequests?.length ? (
                    <View style={FriendsModalScreenStyle.friendRequestsView}>
                        {friendRequests?.map((value) => (
                            <FriendRequestItem
                                key={value.username}
                                item={value}
                                posting={posting}
                                onAcceptInvite={() =>
                                    acceptInvite(value.username)
                                }
                            />
                        ))}
                    </View>
                ) : (
                    <Text style={FriendsModalScreenStyle.listEmptyText}>
                        No friend requests at the moment
                    </Text>
                )}
            </View>
        );
    }

    return (
        <View
            style={[
                FriendsModalScreenStyle.container,
                { paddingBottom: bottom + 15 }
            ]}
        >
            <View>
                <Text style={FriendsModalScreenStyle.titleText}>Friends</Text>
                <TouchableOpacity onPress={() => setShowRequests(true)}>
                    <Text style={FriendsModalScreenStyle.requestsText}>
                        Requests{' '}
                        {!!friendRequests?.length &&
                            `(${friendRequests?.length})`}
                    </Text>
                </TouchableOpacity>
            </View>
            {loaded ? (
                <View style={FriendsModalScreenStyle.profilesView}>
                    <FriendItem
                        name={!!friends?.length && friends[0]?.name}
                        onAddPress={() => setAdding(true)}
                    />
                    <FriendItem
                        name={!!friends?.length && friends[1]?.name}
                        onAddPress={() => setAdding(true)}
                    />
                    <FriendItem
                        name={!!friends?.length && friends[2]?.name}
                        onAddPress={() => setAdding(true)}
                    />
                </View>
            ) : (
                <ActivityIndicator color={COLORS.BUTTON_BLUE} />
            )}
            <Text style={FriendsModalScreenStyle.usernameDescriptionText}>
                Your username is {username}
            </Text>
        </View>
    );
};

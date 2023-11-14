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
import { useActionSheet } from '@expo/react-native-action-sheet';
import { FriendsModalScreenStyle } from '@components/home/FriendsModalScreen/FriendsModalScreen.style';
import {
    deleteRequest,
    getRequest,
    postRequest,
    putRequest
} from '@utils/Axios/Axios.service';
import {
    ResponseFriendsGetInterface,
    ResponseInterface,
    ResponseInvitesGetInterface
} from '@interfaces/response/Response.interface';
import { InvitePostInterface } from '@interfaces/post/Post.interface';
import { InviteInterface, UserInterface } from '@interfaces/general.interface';
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';
import COLORS from '@constants/COLORS';
import { ReducerProps } from '@store/index/index.props';
import { MessagingService } from '@utils/general/MessagingService';
import { FriendItem } from '@components/friends/FriendItem/FriendItem';
import { InviteItem } from '@components/friends/InviteItem/InviteItem';
import { FriendsModalScreenProps } from '@components/home/FriendsModalScreen/FriendsModalScreen.props';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';

export const FriendsModalScreen = ({
    onActionSheetOpened
}: FriendsModalScreenProps): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const { bottom } = useSafeAreaInsets();
    const { showActionSheetWithOptions } = useActionSheet();

    const [friends, setFriends] = useState<UserInterface[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [adding, setAdding] = useState<boolean>(false);
    const [inviteUsername, setInviteUsername] = useState<string>();
    const [showRequests, setShowRequests] = useState<boolean>(false);
    const [invites, setInvites] = useState<InviteInterface[]>([]);
    const [posting, setPosting] = useState<boolean>(false);

    const getInvites = () => {
        getRequest<ResponseInvitesGetInterface>('invites').subscribe(
            (response: ResponseInvitesGetInterface) => {
                if (response?.status) {
                    setInvites(response?.data);
                }
            }
        );
    };

    const loadFriends = useCallback(() => {
        getRequest<ResponseFriendsGetInterface>('friends').subscribe(
            (response: ResponseFriendsGetInterface) => {
                if (response?.status) {
                    setFriends(response?.data);
                    getInvites();

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

    const removeInvite = (id: number) => {
        deleteRequest<ResponseInterface>(`invite/${id}`).subscribe(
            (response: ResponseInterface) => {
                if (response?.status) {
                    getInvites();
                }
            }
        );
    };

    const removeFriend = useCallback(
        (id: number) => {
            deleteRequest<ResponseInterface>(`friend/${id}`).subscribe(
                (response: ResponseInterface) => {
                    if (response?.status) {
                        loadFriends();
                    }
                }
            );
        },
        [loadFriends]
    );

    const openFriendActions = useCallback(
        (id: number, name: string) => {
            const options = ['Remove friend', 'Cancel'];

            showActionSheetWithOptions(
                {
                    options,
                    cancelButtonIndex: 1,
                    userInterfaceStyle: 'light',
                    title: name
                },
                (selectedIndex: number) => {
                    if (selectedIndex === 0) {
                        removeFriend(id);
                    }
                }
            );
            if (onActionSheetOpened && Platform.OS !== 'ios') {
                onActionSheetOpened();
            }
        },
        [onActionSheetOpened, removeFriend, showActionSheetWithOptions]
    );

    const onFriendPress = useCallback(
        (id: number, name: string) => {
            openFriendActions(id, name);
        },
        [openFriendActions]
    );

    const onFriendLongPress = useCallback(
        (id: number, name: string) => {
            openFriendActions(id, name);
        },
        [openFriendActions]
    );

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
                {invites?.length ? (
                    <View style={FriendsModalScreenStyle.friendRequestsView}>
                        {invites?.map((value: InviteInterface) => (
                            <InviteItem
                                key={value.username}
                                item={value}
                                posting={posting}
                                onAcceptInvite={() =>
                                    acceptInvite(value.username)
                                }
                                onRemove={() => removeInvite(value.id)}
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
                        Requests {!!invites?.length && `(${invites?.length})`}
                    </Text>
                </TouchableOpacity>
            </View>
            {loaded ? (
                <View style={FriendsModalScreenStyle.profilesContainer}>
                    {[...Array(5)].map((value, index) => (
                        <View
                            key={value + index.toString()}
                            style={FriendsModalScreenStyle.profileView}
                        >
                            {!!friends?.length && friends[index] ? (
                                <FriendItem
                                    name={friends[index]?.name}
                                    onPress={() =>
                                        onFriendPress(
                                            friends[index]?.id,
                                            friends[index]?.name
                                        )
                                    }
                                    onLongPress={() =>
                                        onFriendLongPress(
                                            friends[index]?.id,
                                            friends[index]?.name
                                        )
                                    }
                                />
                            ) : (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => setAdding(true)}
                                    style={FriendsModalScreenStyle.addView}
                                >
                                    <Icon name={IconEnum.PLUS} size={14} />
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
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

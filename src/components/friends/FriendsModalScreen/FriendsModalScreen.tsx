import React, { JSX, useCallback, useEffect, useState } from 'react';
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
import { useFriends } from '@hooks/useFriends';
import { FriendsModalScreenStyle } from '@components/friends/FriendsModalScreen/FriendsModalScreen.style';
import {
    deleteRequest,
    getRequest,
    postRequest,
    putRequest
} from '@utils/Axios/Axios.service';
import {
    ResponseInterface,
    ResponseInvitesGetInterface
} from '@interfaces/response/Response.interface';
import { InvitePostInterface } from '@interfaces/post/Post.interface';
import { InviteInterface } from '@interfaces/general.interface';
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';
import COLORS from '@constants/COLORS';
import { ReducerProps } from '@store/index/index.props';
import { FriendItem } from '@components/friends/FriendItem/FriendItem';
import { InviteItem } from '@components/friends/InviteItem/InviteItem';
import { FriendsModalScreenProps } from '@components/friends/FriendsModalScreen/FriendsModalScreen.props';
import { AddFriendButton } from '@components/friends/AddFriendButton/AddFriendButton';

export const FriendsModalScreen = ({
    onActionSheetOpened
}: FriendsModalScreenProps): JSX.Element => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const { bottom } = useSafeAreaInsets();
    const { showActionSheetWithOptions } = useActionSheet();

    const [adding, setAdding] = useState<boolean>(false);
    const [inviteUsername, setInviteUsername] = useState<string>();
    const [showInvites, setShowInvites] = useState<boolean>(false);
    const [invites, setInvites] = useState<InviteInterface[]>([]);
    const [posting, setPosting] = useState<boolean>(false);

    const { friends, loadFriends, loaded } = useFriends();

    const loadInvites = () => {
        getRequest<ResponseInvitesGetInterface>('invites').subscribe(
            (response: ResponseInvitesGetInterface) => {
                if (response?.status) {
                    setInvites(response?.data);
                }
            }
        );
    };

    useEffect(() => {
        loadInvites();
    }, []);

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
                    setShowInvites(false);
                }, 400);
            }
        });
    };

    const removeInvite = (id: number) => {
        deleteRequest<ResponseInterface>(`invite/${id}`).subscribe(
            (response: ResponseInterface) => {
                if (response?.status) {
                    loadInvites();
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

    if (showInvites) {
        return (
            <View
                style={[
                    FriendsModalScreenStyle.container,
                    FriendsModalScreenStyle.flexStart
                ]}
            >
                <Text style={FriendsModalScreenStyle.titleText}>
                    Friend invites
                </Text>
                {invites?.length ? (
                    <View style={FriendsModalScreenStyle.friendInvitesView}>
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
                        No invites at the moment
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
                <TouchableOpacity onPress={() => setShowInvites(true)}>
                    <Text style={FriendsModalScreenStyle.invitesText}>
                        Invites {!!invites?.length && `(${invites?.length})`}
                    </Text>
                </TouchableOpacity>
            </View>
            {loaded ? (
                <View style={FriendsModalScreenStyle.profilesContainer}>
                    {[...Array(8)].map((value, index) => (
                        <View
                            key={value + index.toString()}
                            style={FriendsModalScreenStyle.profileView}
                        >
                            {!!friends?.length && friends[index] ? (
                                <FriendItem
                                    name={friends[index]?.name}
                                    profilePhoto={friends[index]?.profilePhoto}
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
                                    size={55}
                                />
                            ) : (
                                <AddFriendButton
                                    size={55}
                                    onPress={() => setAdding(true)}
                                />
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

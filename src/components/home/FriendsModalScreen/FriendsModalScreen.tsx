import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
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

export const FriendsModalScreen = (): JSX.Element => {
    const [friends, setFriends] = useState<UserInterface[]>([]);
    const [adding, setAdding] = useState<boolean>(false);
    const [inviteUsername, setInviteUsername] = useState<string>();
    const [showRequests, setShowRequests] = useState<boolean>(false);
    const [friendRequests, setFriendRequests] = useState<UserInterface[]>([]);

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
                }
            }
        );
    }, []);

    useEffect(() => {
        loadFriends();
    }, [loadFriends]);

    const sendInvite = useCallback(() => {
        postRequest<ResponseInterface, InvitePostInterface>('invite', {
            receiver: inviteUsername
        }).subscribe((response: ResponseInterface) => {
            if (response?.status) {
                Alert.alert(response.message);
                setAdding(false);
            }
        });
    }, [inviteUsername]);

    const acceptInvite = (username: string) => {
        putRequest<ResponseInterface, InvitePostInterface>('invite', {
            receiver: username
        }).subscribe((response: ResponseInterface) => {
            if (response?.status) {
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
                    onChangeText={setInviteUsername}
                    style={FriendsModalScreenStyle.input}
                />
                <KeyboardAvoidingView>
                    <TouchableOpacity
                        onPress={sendInvite}
                        style={FriendsModalScreenStyle.sendButtonView}
                    >
                        <Text style={FriendsModalScreenStyle.sendButtonText}>
                            Send
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        );
    }

    if (showRequests) {
        return (
            <View style={FriendsModalScreenStyle.container}>
                <Text style={FriendsModalScreenStyle.titleText}>
                    Friends requests
                </Text>
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
                                <ProfilePhoto name={value.username} size={40} />
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
                                <Text
                                    style={
                                        FriendsModalScreenStyle.friendRequestItemAcceptButtonText
                                    }
                                >
                                    Accept
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
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
                {friends?.length > 0 ? (
                    <View style={FriendsModalScreenStyle.profileView}>
                        <ProfilePhoto name={friends[0].name} size={70} />
                        <Text>{friends[0].name}</Text>
                    </View>
                ) : (
                    <TouchableOpacity
                        onPress={() => setAdding(true)}
                        style={FriendsModalScreenStyle.addView}
                    >
                        <Text style={FriendsModalScreenStyle.addText}>Add</Text>
                    </TouchableOpacity>
                )}
                {friends?.length > 1 ? (
                    <View style={FriendsModalScreenStyle.profileView}>
                        <ProfilePhoto name={friends[1].name} size={70} />
                        <Text>{friends[1].name}</Text>
                    </View>
                ) : (
                    <TouchableOpacity
                        onPress={() => setAdding(true)}
                        style={FriendsModalScreenStyle.addView}
                    >
                        <Text style={FriendsModalScreenStyle.addText}>Add</Text>
                    </TouchableOpacity>
                )}
                {friends?.length > 2 ? (
                    <View style={FriendsModalScreenStyle.profileView}>
                        <ProfilePhoto name={friends[2].name} size={70} />
                        <Text>{friends[2].name}</Text>
                    </View>
                ) : (
                    <TouchableOpacity
                        onPress={() => setAdding(true)}
                        style={FriendsModalScreenStyle.addView}
                    >
                        <Text style={FriendsModalScreenStyle.addText}>Add</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

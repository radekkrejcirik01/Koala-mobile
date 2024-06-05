import React, { JSX, useCallback, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFriends } from '@hooks/useFriends';
import { useSending } from '@hooks/useSending';
import { SelectFriendItem } from '@components/friends/SelectFriendItem/SelectFriendItem';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { EmotionMessagePostInterface } from '@interfaces/post/Post.interface';
import COLORS from '@constants/COLORS';
import { DirectSharingModalScreenProps } from '@components/home/DirectSharingModalScreen/DirectSharingModalScreen.props';
import { DirectSharingModalScreenStyle } from '@components/home/DirectSharingModalScreen/DirectSharingModalScreen.style';
import { AddFriendButton } from '@components/friends/AddFriendButton/AddFriendButton';
import { filterSelected } from '@functions/filterSelected';
import { ShareButton } from '@components/home/ShareButton/ShareButton';
import { AddFriendsDescriptionButton } from '@components/friends/AddFriendsDescriptionButton/AddFriendsDescriptionButton';

export const DirectSharingModalScreen = ({
    onAddFriendPress
}: DirectSharingModalScreenProps): JSX.Element => {
    const { bottom } = useSafeAreaInsets();

    const [message, setMessage] = useState<string>();

    const { friends, loaded } = useFriends();
    const { sending, sent, setSending, setSent } = useSending();

    const selectedFriends = useRef<number[]>([]);

    const onFriendSelect = (id: number) => {
        selectedFriends.current = filterSelected(selectedFriends.current, id);
    };

    const onSend = useCallback(() => {
        const selected = selectedFriends.current;

        if (!message?.length) {
            Alert.alert('Please write a message first');
            return;
        }
        if (!selected.length) {
            Alert.alert('Please select a friend first');
            return;
        }

        setSending(true);

        postRequest<ResponseInterface, EmotionMessagePostInterface>(
            'emotion-message',
            {
                ids: selected,
                message
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status === 'success') {
                setSending(false);
                setSent(true);

                setMessage('');
            }
        });
    }, [message, setSending, setSent]);

    const friendsAdded = useMemo(
        (): boolean => !!friends?.length,
        [friends?.length]
    );

    return (
        <View
            style={[
                DirectSharingModalScreenStyle.container,
                {
                    paddingBottom: bottom || 10
                }
            ]}
        >
            <View style={DirectSharingModalScreenStyle.inputView}>
                <TextInput
                    multiline
                    placeholder="What's happening??"
                    autoFocus
                    autoCorrect={false}
                    value={message}
                    onChangeText={setMessage}
                    selectionColor={COLORS.BUTTON_BLUE}
                    style={DirectSharingModalScreenStyle.input}
                />
            </View>
            <View style={DirectSharingModalScreenStyle.sendContainer}>
                {loaded ? (
                    <>
                        <View style={DirectSharingModalScreenStyle.selectView}>
                            {friends?.map((value) => (
                                <SelectFriendItem
                                    key={value.username}
                                    item={{
                                        name: value.name,
                                        username: value.username
                                    }}
                                    onSelect={() => onFriendSelect(value.id)}
                                    sent={sent}
                                />
                            ))}
                            <AddFriendButton
                                size={45}
                                onPress={onAddFriendPress}
                                style={
                                    DirectSharingModalScreenStyle.addFriendButton
                                }
                            />
                        </View>
                        {friendsAdded ? (
                            <ShareButton
                                onPress={onSend}
                                sending={sending}
                                sent={sent}
                            />
                        ) : (
                            <AddFriendsDescriptionButton
                                onPress={onAddFriendPress}
                            />
                        )}
                    </>
                ) : (
                    <ActivityIndicator color={COLORS.BUTTON_BLUE} />
                )}
            </View>
        </View>
    );
};

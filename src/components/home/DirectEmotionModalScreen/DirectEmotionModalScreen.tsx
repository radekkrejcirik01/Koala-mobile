import React, { JSX, useCallback, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFriends } from '@hooks/useFriends';
import { useSending } from '@hooks/useSending';
import { ShareFriendItem } from '@components/home/ShareFriendItem/ShareFriendItem';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { EmotionMessagePostInterface } from '@interfaces/post/Post.interface';
import COLORS from '@constants/COLORS';
import { DirectEmotionModalScreenProps } from '@components/home/DirectEmotionModalScreen/DirectEmotionModalScreen.props';
import { DirectEmotionModalScreenStyle } from '@components/home/DirectEmotionModalScreen/DirectEmotionModalScreen.style';
import { AddFriendButton } from '@components/home/AddFriendButton/AddFriendButton';
import { filterSelected } from '@functions/filterSelected';
import { ShareButton } from '@components/home/ShareButton/ShareButton';
import { AddFriendsDescriptionButton } from '@components/home/AddFriendsDescriptionButton/AddFriendsDescriptionButton';

export const DirectEmotionModalScreen = ({
    onAddFriendPress
}: DirectEmotionModalScreenProps): JSX.Element => {
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
                DirectEmotionModalScreenStyle.container,
                {
                    paddingBottom: bottom || 10
                }
            ]}
        >
            <View style={DirectEmotionModalScreenStyle.inputView}>
                <TextInput
                    multiline
                    placeholder="What happened?"
                    autoFocus
                    autoCorrect={false}
                    value={message}
                    onChangeText={setMessage}
                    selectionColor={COLORS.BUTTON_BLUE}
                    style={DirectEmotionModalScreenStyle.input}
                />
            </View>
            <View style={DirectEmotionModalScreenStyle.sendContainer}>
                {loaded ? (
                    <>
                        <View style={DirectEmotionModalScreenStyle.selectView}>
                            {friends?.map((value) => (
                                <ShareFriendItem
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
                                    DirectEmotionModalScreenStyle.addFriendButton
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

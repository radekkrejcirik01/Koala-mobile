import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFriends } from '@hooks/useFriends';
import { useSending } from '@hooks/useSending';
import { CheckOnScreenStyle } from '@screens/account/CheckOnScreen/CheckOnScreen.style';
import COLORS from '@constants/COLORS';
import { ShareFriendItem } from '@components/home/ShareFriendItem/ShareFriendItem';
import { AddFriendButton } from '@components/home/AddFriendButton/AddFriendButton';
import { AddFriendsDescriptionButton } from '@components/home/AddFriendsDescriptionButton/AddFriendsDescriptionButton';
import { filterSelected } from '@functions/filterSelected';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { CheckOnMessagePostInterface } from '@interfaces/post/Post.interface';

export const CheckOnScreen = () => {
    const { top } = useSafeAreaInsets();

    const [message, setMessage] = useState<string>('How was today?');

    const { friends, loaded } = useFriends();
    const { sending, sent, setSending, setSent } = useSending();

    const selectedFriends = useRef<number[]>([]);

    const onFriendSelect = (id: number) => {
        selectedFriends.current = filterSelected(selectedFriends.current, id);
    };

    const onAddFriendPress = () => {};

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
        setSent(false);

        postRequest<ResponseInterface, CheckOnMessagePostInterface>(
            'check-on-message',
            {
                ids: selected,
                message
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status === 'success') {
                setSending(false);
                setSent(true);

                selectedFriends.current = [];
            }
        });
    }, [message, setSending, setSent]);

    const friendsAdded = useMemo(
        (): boolean => !!friends?.length,
        [friends?.length]
    );

    return (
        <ScrollView
            style={{ paddingTop: top + 150 }}
            contentContainerStyle={CheckOnScreenStyle.contentContainer}
        >
            <Text style={CheckOnScreenStyle.titleText}>Check-on</Text>
            <Text style={CheckOnScreenStyle.descriptionText}>
                Ask your friend how they are doing
            </Text>
            <TextInput
                value={message}
                onChangeText={setMessage}
                selectionColor={COLORS.BUTTON_BLUE}
                style={CheckOnScreenStyle.input}
            />
            <Text style={CheckOnScreenStyle.editText}>
                You can edit this message
            </Text>
            <View style={CheckOnScreenStyle.sendContainer}>
                {loaded ? (
                    <>
                        <View style={CheckOnScreenStyle.selectView}>
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
                                style={CheckOnScreenStyle.addFriendButton}
                            />
                        </View>
                        {friendsAdded ? (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                disabled={sending}
                                style={CheckOnScreenStyle.sendButtonView}
                                onPress={onSend}
                            >
                                {sending ? (
                                    <ActivityIndicator color={COLORS.WHITE} />
                                ) : (
                                    <Text
                                        style={
                                            CheckOnScreenStyle.sendButtonText
                                        }
                                    >
                                        Send
                                    </Text>
                                )}
                            </TouchableOpacity>
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
        </ScrollView>
    );
};

import React, { JSX, useCallback, useMemo, useRef } from 'react';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFriends } from '@hooks/useFriends';
import { useSending } from '@hooks/useSending';
import { ShareModalScreenProps } from '@components/home/ShareModalScreen/ShareModalScreen.props';
import { ShareModalScreenStyle } from '@components/home/ShareModalScreen/ShareModalScreen.style';
import { SelectFriendItem } from '@components/friends/SelectFriendItem/SelectFriendItem';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { EmotionMessagePostInterface } from '@interfaces/post/Post.interface';
import COLORS from '@constants/COLORS';
import { CanHelp } from '@components/home/CanHelp/CanHelp';
import { AddFriendButton } from '@components/friends/AddFriendButton/AddFriendButton';
import { filterSelected } from '@functions/filterSelected';
import { SendButton } from '@components/home/SendButton/SendButton';
import { AddFriendsDescriptionButton } from '@components/friends/AddFriendsDescriptionButton/AddFriendsDescriptionButton';

export const ShareModalScreen = ({
    item,
    onAddFriendPress
}: ShareModalScreenProps): JSX.Element => {
    const { bottom } = useSafeAreaInsets();

    const { friends, loaded } = useFriends();
    const { sending, sent, setSending, setSent } = useSending();

    const selectedFriends = useRef<number[]>([]);

    const onFriendSelect = (id: number) => {
        setSent(false);

        selectedFriends.current = filterSelected(selectedFriends.current, id);
    };

    const onSend = useCallback(() => {
        const selected = selectedFriends.current;

        if (!selected.length) {
            Alert.alert('Please select a friend first');
            return;
        }

        setSending(true);

        postRequest<ResponseInterface, EmotionMessagePostInterface>(
            'emotion-message',
            {
                ids: selected,
                message: item.message
            }
        ).subscribe((response: ResponseInterface) => {
            if (response?.status === 'success') {
                setSending(false);
                setSent(true);

                selectedFriends.current = [];
            }
        });
    }, [item.message, setSending, setSent]);

    const friendsAdded = useMemo(
        (): boolean => !!friends?.length,
        [friends?.length]
    );

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
                {item.message}
            </Text>
            <View style={ShareModalScreenStyle.content}>
                <CanHelp tip1={item?.tip1} tip2={item?.tip2} />
                <View style={ShareModalScreenStyle.sendContainer}>
                    {loaded ? (
                        <>
                            <View style={ShareModalScreenStyle.selectView}>
                                {friends?.map((value) => (
                                    <SelectFriendItem
                                        key={value.username}
                                        item={{
                                            name: value.name,
                                            username: value.username
                                        }}
                                        onSelect={() =>
                                            onFriendSelect(value.id)
                                        }
                                        sent={sent}
                                    />
                                ))}
                                <AddFriendButton
                                    size={45}
                                    onPress={onAddFriendPress}
                                    style={
                                        ShareModalScreenStyle.addFriendButton
                                    }
                                />
                            </View>
                            {friendsAdded ? (
                                <SendButton
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
        </View>
    );
};

import React, { JSX, useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useFriends } from '@hooks/useFriends';
import { SelectFriendItem } from '@components/friends/SelectFriendItem/SelectFriendItem';
import { AddFriendButton } from '@components/friends/AddFriendButton/AddFriendButton';
import { SendButton } from '@components/home/SendButton/SendButton';
import { AddFriendsDescriptionButton } from '@components/friends/AddFriendsDescriptionButton/AddFriendsDescriptionButton';
import COLORS from '@constants/COLORS';
import { SendProps } from '@components/home/Send/Send.props';
import { SendStyle } from '@components/home/Send/Send.style';

export const Send = ({
    onFriendSelect,
    onAddFriendPress,
    onPressSend,
    sending,
    sent,
    style
}: SendProps): JSX.Element => {
    const { friends, loaded } = useFriends();

    const friendsAdded = useMemo(
        (): boolean => !!friends?.length,
        [friends?.length]
    );

    return (
        <View style={style}>
            {loaded ? (
                <>
                    <View style={SendStyle.selectView}>
                        {friends?.map((item) => (
                            <SelectFriendItem
                                key={item.username}
                                item={{
                                    name: item.name,
                                    username: item.username
                                }}
                                onSelect={() => onFriendSelect(item.id)}
                                sent={sent}
                            />
                        ))}
                        <AddFriendButton
                            size={45}
                            onPress={onAddFriendPress}
                            style={SendStyle.addFriendButton}
                        />
                    </View>
                    {friendsAdded ? (
                        <SendButton
                            onPress={onPressSend}
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
    );
};

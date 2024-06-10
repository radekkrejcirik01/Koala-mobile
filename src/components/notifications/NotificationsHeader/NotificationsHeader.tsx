import React, { JSX, useEffect, useRef, useState } from 'react';
import {
    Keyboard,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useFriends } from '@hooks/useFriends';
import { UserInterface } from '@interfaces/general.interface';
import COLORS from '@constants/COLORS';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { NotificationsHeaderStyle } from '@components/notifications/NotificationsHeader/NotificationsHeader.style';
import { NotificationsHeaderProps } from '@components/notifications/NotificationsHeader/NotificationsHeader.props';
import { BackButton } from '@components/general/BackButton/BackButton';

export const NotificationsHeader = ({
    onPressFriend
}: NotificationsHeaderProps): JSX.Element => {
    const { friends, loadFriends } = useFriends(false);

    const [searchValue, setSearchValue] = useState<string>('');
    const [filtered, setFiltered] = useState<UserInterface[]>([]);
    const [focused, setFocused] = useState<boolean>(false);

    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        if (friends) {
            setFiltered(
                friends.filter((item) =>
                    item?.name
                        ?.toLowerCase()
                        .includes(searchValue?.toLowerCase())
                )
            );
        }
    }, [friends, searchValue]);

    const done = () => {
        Keyboard.dismiss();
        setSearchValue('');
        setFiltered([]);
        setFocused(false);
    };

    return (
        <View style={NotificationsHeaderStyle.container}>
            <View style={NotificationsHeaderStyle.row1}>
                <View style={NotificationsHeaderStyle.row2}>
                    <BackButton />
                    <Text style={NotificationsHeaderStyle.messagesTitle}>
                        Chats
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        inputRef?.current?.focus();
                    }}
                    style={[
                        NotificationsHeaderStyle.searchView,
                        focused && NotificationsHeaderStyle.focused
                    ]}
                >
                    <Text style={NotificationsHeaderStyle.searchEmojiText}>
                        🔎
                    </Text>
                    <TextInput
                        ref={inputRef}
                        placeholder="Search"
                        placeholderTextColor={COLORS.GRAY_200}
                        value={searchValue}
                        onChangeText={setSearchValue}
                        onFocus={() => {
                            loadFriends();
                            setFocused(true);
                        }}
                        selectionColor={COLORS.PURPLE}
                        style={NotificationsHeaderStyle.searchInput}
                    />
                    {focused && (
                        <TouchableOpacity onPress={done}>
                            <Text style={NotificationsHeaderStyle.doneText}>
                                Done
                            </Text>
                        </TouchableOpacity>
                    )}
                </TouchableOpacity>
            </View>
            {focused && (
                <View style={NotificationsHeaderStyle.itemsView}>
                    {filtered.map((item) => (
                        <TouchableOpacity
                            key={item.username}
                            activeOpacity={0.7}
                            onPress={() => {
                                onPressFriend(item.id);
                                done();
                            }}
                            style={NotificationsHeaderStyle.button}
                        >
                            <ProfilePhoto name={item.name} size={35} />
                            <Text style={NotificationsHeaderStyle.buttonText}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

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
import { FriendsSearchStyle } from '@components/notifications/FriendsSearch/FriendsSearch.style';
import { FriendsSearchProps } from '@components/notifications/FriendsSearch/FriendsSearch.props';

export const FriendsSearch = ({
    onPressFriend
}: FriendsSearchProps): JSX.Element => {
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
        <View>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    inputRef?.current?.focus();
                }}
                style={FriendsSearchStyle.searchView}
            >
                <Text style={FriendsSearchStyle.searchEmojiText}>🔎</Text>
                <TextInput
                    ref={inputRef}
                    placeholder="Search"
                    placeholderTextColor={COLORS.LIGHTGRAY_100}
                    value={searchValue}
                    onChangeText={setSearchValue}
                    onFocus={() => {
                        loadFriends();
                        setFocused(true);
                    }}
                    selectionColor={COLORS.BUTTON_BLUE}
                    style={FriendsSearchStyle.searchInput}
                />
                {focused && (
                    <TouchableOpacity onPress={done}>
                        <Text style={FriendsSearchStyle.doneText}>Done</Text>
                    </TouchableOpacity>
                )}
            </TouchableOpacity>
            {focused && (
                <View style={FriendsSearchStyle.itemsView}>
                    {filtered.map((item) => (
                        <TouchableOpacity
                            key={item.username}
                            activeOpacity={0.7}
                            onPress={() => {
                                onPressFriend(item.id);
                                done();
                            }}
                            style={FriendsSearchStyle.button}
                        >
                            <ProfilePhoto name={item.name} size={35} />
                            <Text style={FriendsSearchStyle.buttonText}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

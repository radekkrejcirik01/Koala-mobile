import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UserInterface } from '@interfaces/general.interface';
import { getRequest } from '@utils/Axios/Axios.service';
import { ResponseFriendsGetInterface } from '@interfaces/response/Response.interface';
import { FilterModalStyle } from '@components/notifications/FilterModal/FilterModal.style';
import COLORS from '@constants/COLORS';
import { FilterModalProps } from '@components/notifications/FilterModal/FilterModal.props';
import { FriendItem } from '@components/friends/FriendItem/FriendItem';

export const FilterModal = ({
    onFriendPress,
    onClearFilter
}: FilterModalProps): JSX.Element => {
    const { bottom } = useSafeAreaInsets();

    const [friends, setFriends] = useState<UserInterface[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    const getFriends = () => {
        getRequest<ResponseFriendsGetInterface>('friends').subscribe(
            (response: ResponseFriendsGetInterface) => {
                if (response?.status) {
                    setFriends(response?.data);

                    setLoaded(true);
                }
            }
        );
    };

    useEffect(() => {
        getFriends();
    }, []);

    return (
        <View
            style={[FilterModalStyle.container, { paddingBottom: bottom + 10 }]}
        >
            <Text style={FilterModalStyle.titleText}>Filter by</Text>
            {loaded ? (
                <View style={FilterModalStyle.friendsContainer}>
                    {friends?.length ? (
                        friends?.map((value) => (
                            <FriendItem
                                key={value.id}
                                name={value.name}
                                onPress={() =>
                                    onFriendPress(value.id, value.name)
                                }
                                size={50}
                                style={FilterModalStyle.friendItem}
                            />
                        ))
                    ) : (
                        <Text style={FilterModalStyle.emptyFriendsText}>
                            No friends added yet
                        </Text>
                    )}
                </View>
            ) : (
                <ActivityIndicator color={COLORS.BUTTON_BLUE} />
            )}
            <TouchableOpacity
                hitSlop={10}
                onPress={onClearFilter}
                style={FilterModalStyle.filterTextButton}
            >
                <Text style={FilterModalStyle.filterText}>Clear filter</Text>
            </TouchableOpacity>
        </View>
    );
};

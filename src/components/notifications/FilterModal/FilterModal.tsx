import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UserInterface } from '@interfaces/general.interface';
import { getRequest } from '@utils/Axios/Axios.service';
import { ResponseFriendsGetInterface } from '@interfaces/response/Response.interface';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { FilterModalStyle } from '@components/notifications/FilterModal/FilterModal.style';
import COLORS from '@constants/COLORS';
import { FilterModalProps } from '@components/notifications/FilterModal/FilterModal.props';

export const FilterModal = ({
    isFiltered,
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
        // 300 ms modal opening time
        setTimeout(() => {
            getFriends();
        }, 300);
    }, []);

    return (
        <View style={[FilterModalStyle.container, { paddingBottom: bottom }]}>
            <Text style={FilterModalStyle.titleText}>Filter</Text>
            <View style={FilterModalStyle.contentView}>
                <View style={FilterModalStyle.friendsContainer}>
                    {loaded ? (
                        <>
                            {friends?.length ? (
                                friends?.map((value) => (
                                    <TouchableOpacity
                                        key={value.id}
                                        activeOpacity={0.9}
                                        onPress={() =>
                                            onFriendPress(value.id, value.name)
                                        }
                                        style={FilterModalStyle.friendItemView}
                                    >
                                        <ProfilePhoto
                                            name={value.name}
                                            size={55}
                                        />
                                        <Text
                                            style={
                                                FilterModalStyle.friendItemNameText
                                            }
                                        >
                                            {value.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))
                            ) : (
                                <Text style={FilterModalStyle.emptyFriendsText}>
                                    No friends added yet
                                </Text>
                            )}
                        </>
                    ) : (
                        <ActivityIndicator
                            color={COLORS.BUTTON_BLUE}
                            style={FilterModalStyle.activityIndicator}
                        />
                    )}
                </View>
                {isFiltered && !!friends?.length && (
                    <TouchableOpacity hitSlop={10} onPress={onClearFilter}>
                        <Text style={FilterModalStyle.filterText}>
                            Clear filter
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { NotificationsHeader } from '@components/home/NotificationsHeader/NotificationsHeader';
import { HomeScreenHeaderProps } from '@components/home/HomeScreenHeader/HomeScreenHeader.props';
import { ReducerProps } from '@store/index/index.props';
import { HomeScreenHeaderStyle } from '@components/home/HomeScreenHeader/HomeScreenHeader.style';

export const HomeScreenHeader = ({
    onProfilePress
}: HomeScreenHeaderProps): JSX.Element => {
    const { name, profilePhoto } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    return (
        <View style={HomeScreenHeaderStyle.container}>
            <View style={HomeScreenHeaderStyle.rowCenter}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    hitSlop={10}
                    onPress={onProfilePress}
                    style={HomeScreenHeaderStyle.profileButtonView}
                >
                    <ProfilePhoto name={name} photo={profilePhoto} size={42} />
                </TouchableOpacity>
                <Text style={HomeScreenHeaderStyle.homeTitleText}>Home</Text>
            </View>
            <NotificationsHeader />
        </View>
    );
};

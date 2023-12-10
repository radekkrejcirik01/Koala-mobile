import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NotificationsScreenHeaderStyle } from '@components/notifications/NotificationsScreenHeader/NotificationsScreenHeader.style';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { NotificationsScreenHeaderProps } from '@components/notifications/NotificationsScreenHeader/NotificationsScreenHeader.props';

export const NotificationsScreenHeader = ({
    onFilterPress,
    filterName
}: NotificationsScreenHeaderProps): JSX.Element => {
    const navigation = useNavigation();

    return (
        <View style={NotificationsScreenHeaderStyle.container}>
            <View style={NotificationsScreenHeaderStyle.centerView}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name={IconEnum.BACK_BLUE} size={24} />
                </TouchableOpacity>
                <Text style={NotificationsScreenHeaderStyle.titleText}>
                    Supporting
                </Text>
            </View>
            <TouchableOpacity
                activeOpacity={0.9}
                hitSlop={10}
                onPress={onFilterPress}
            >
                <Text style={NotificationsScreenHeaderStyle.filterText}>
                    {filterName || 'Filter'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NotificationsScreenHeaderStyle } from '@components/notifications/NotificationsScreenHeader/NotificationsScreenHeader.style';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';

export const NotificationsScreenHeader = (): JSX.Element => {
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
        </View>
    );
};

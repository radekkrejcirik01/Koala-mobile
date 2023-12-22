import React, { JSX } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NotificationsScreenHeaderStyle } from '@components/notifications/NotificationsScreenHeader/NotificationsScreenHeader.style';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { NotificationsScreenHeaderProps } from '@components/notifications/NotificationsScreenHeader/NotificationsScreenHeader.props';

export const NotificationsScreenHeader = ({
    onPlusPress
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
                    Messages{' '}
                    {Platform.OS === 'ios' && (
                        <Text style={NotificationsScreenHeaderStyle.emojiText}>
                            💭
                        </Text>
                    )}
                </Text>
            </View>
            <TouchableOpacity
                activeOpacity={0.7}
                hitSlop={20}
                onPress={onPlusPress}
            >
                <Icon name={IconEnum.PLUS} size={20} />
            </TouchableOpacity>
        </View>
    );
};

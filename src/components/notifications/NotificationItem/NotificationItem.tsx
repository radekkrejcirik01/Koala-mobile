import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { NotificationItemEnum } from '@components/notifications/NotificationItem/NotificationItem.enum';
import { NotificationItemStyle } from '@components/notifications/NotificationItem/NotificationItem.style';
import { NotificationItemProps } from '@components/notifications/NotificationItem/NotificationItem.props';

export const NotificationItem = ({
    item,
    onPress
}: NotificationItemProps): JSX.Element => {
    const unseen = useMemo((): boolean => !item?.seen, [item?.seen]);

    function getTitle(type: NotificationItemEnum): string {
        if (type === NotificationItemEnum.EmotionNotificationType) {
            return ' is sharing';
        }
        return '';
    }

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={NotificationItemStyle.container}
        >
            <View style={NotificationItemStyle.profileView}>
                {unseen && <View style={NotificationItemStyle.newItem} />}
                <ProfilePhoto name={item.name} size={40} />
            </View>
            <Text style={NotificationItemStyle.titleText}>
                {item.name}
                {getTitle(item.type)}
            </Text>
            <Text
                style={[
                    NotificationItemStyle.messageText,
                    unseen && NotificationItemStyle.unseenText
                ]}
            >
                {item.message}
            </Text>
        </TouchableOpacity>
    );
};

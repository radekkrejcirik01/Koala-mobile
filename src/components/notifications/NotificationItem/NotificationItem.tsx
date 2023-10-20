import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { NotificationItemEnum } from '@components/notifications/NotificationItem/NotificationItem.enum';
import { NotificationItemStyle } from '@components/notifications/NotificationItem/NotificationItem.style';
import { NotificationItemProps } from '@components/notifications/NotificationItem/NotificationItem.props';

export const NotificationItem = ({
    item,
    onSendSupport
}: NotificationItemProps): JSX.Element => {
    const [liked, setLiked] = useState<boolean>(!!item?.liked);

    const sendSupport = useCallback(() => {
        setLiked(true);
        onSendSupport();
    }, [onSendSupport]);

    function getTitle(type: NotificationItemEnum): string {
        if (type === NotificationItemEnum.EmotionNotificationType) {
            return ' is sharing';
        }
        if (type === NotificationItemEnum.SupportNotificationType) {
            return ' is sending support ❤️‍';
        }
        return '';
    }

    return (
        <View style={NotificationItemStyle.container}>
            <ProfilePhoto name={item.name} size={40} />
            <Text style={NotificationItemStyle.titleText}>
                {item.name}
                {getTitle(item.type)}
            </Text>
            <Text style={NotificationItemStyle.messageText}>
                {item.message}
            </Text>
            {item.type === NotificationItemEnum.EmotionNotificationType && (
                <View style={NotificationItemStyle.supportView}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        disabled={liked}
                        onPress={sendSupport}
                        style={NotificationItemStyle.likeButtonView}
                    >
                        <Text
                            style={[
                                liked
                                    ? NotificationItemStyle.fontSize20
                                    : NotificationItemStyle.fontSize26,
                                NotificationItemStyle.colorBlack
                            ]}
                        >
                            {liked ? '❤️‍' : '♡'}
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={[
                            NotificationItemStyle.marginTop8,
                            NotificationItemStyle.colorBlack
                        ]}
                    >
                        {liked
                            ? `${item.name} received your support`
                            : 'Send support'}
                    </Text>
                </View>
            )}
        </View>
    );
};

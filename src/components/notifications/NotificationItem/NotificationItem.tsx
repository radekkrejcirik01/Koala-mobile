import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { NotificationItemProps } from '@components/notifications/NotificationItem/NotificationItem.props';
import { NotificationItemStyle } from '@components/notifications/NotificationItem/NotificationItem.style';

export const NotificationItem = ({
    item,
    onSendSupport
}: NotificationItemProps): JSX.Element => {
    const [liked, setLiked] = useState<boolean>(!!item?.liked);

    const sendSupport = useCallback(() => {
        setLiked(true);
        onSendSupport();
    }, [onSendSupport]);

    return (
        <View style={NotificationItemStyle.container}>
            <ProfilePhoto name={item.name} size={40} />
            <Text style={NotificationItemStyle.titleText}>
                {item.name}
                {item.type === 'emotion'
                    ? ' is sharing'
                    : ' is sending support ❤️‍🩹'}
            </Text>
            <Text style={NotificationItemStyle.messageText}>
                {item.message}
            </Text>
            {item.type === 'emotion' && (
                <View style={NotificationItemStyle.supportView}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        disabled={liked}
                        onPress={sendSupport}
                        style={NotificationItemStyle.likeButtonView}
                    >
                        <Text
                            style={
                                liked
                                    ? NotificationItemStyle.fontSize16
                                    : NotificationItemStyle.fontSize22
                            }
                        >
                            {liked ? '❤️‍🩹' : '♡'}
                        </Text>
                    </TouchableOpacity>
                    <Text style={NotificationItemStyle.marginTop8}>
                        {liked
                            ? `${item.name} received your support`
                            : 'Send support'}
                    </Text>
                </View>
            )}
        </View>
    );
};

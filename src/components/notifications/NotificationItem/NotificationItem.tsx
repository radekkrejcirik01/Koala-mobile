import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { NotificationItemProps } from '@components/notifications/NotificationItem/NotificationItem.props';
import { NotificationItemStyle } from '@components/notifications/NotificationItem/NotificationItem.style';

export const NotificationItem = ({
    item,
    onSendSupport
}: NotificationItemProps): JSX.Element => {
    const [liked, setLiked] = useState<boolean>(!!item?.liked);

    return (
        <View style={NotificationItemStyle.container}>
            <View style={NotificationItemStyle.row}>
                <ProfilePhoto name={item.name} size={40} />
                <View style={NotificationItemStyle.paddingLeft}>
                    <Text style={NotificationItemStyle.titleText}>
                        {item.name}
                        {item.type === 'emotion'
                            ? ' is sharing'
                            : ' is sending support ❤️'}
                    </Text>
                    <Text>{item.message}</Text>
                </View>
            </View>
            {item.type === 'emotion' && (
                <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={liked}
                    onPress={() => {
                        setLiked(true);
                        onSendSupport();
                    }}
                    style={NotificationItemStyle.likeButtonView}
                >
                    <Text
                        style={
                            liked
                                ? NotificationItemStyle.fontSize16
                                : NotificationItemStyle.fontSize22
                        }
                    >
                        {liked ? '❤️' : '♡'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

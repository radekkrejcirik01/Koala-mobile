import React, { useCallback, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { NotificationItemEnum } from '@components/notifications/NotificationItem/NotificationItem.enum';
import { NotificationItemStyle } from '@components/notifications/NotificationItem/NotificationItem.style';
import { NotificationItemProps } from '@components/notifications/NotificationItem/NotificationItem.props';
import { getHourUnixTime } from '@functions/getHourUnixTime';

export const NotificationItem = ({
    item,
    onPress
}: NotificationItemProps): React.JSX.Element => {
    const unseen = useMemo((): boolean => !item?.seen, [item?.seen]);

    const [pressed, setPressed] = useState<boolean>(false);

    const press = useCallback(() => {
        onPress();
        setPressed(true);
    }, [onPress]);

    function getTitle(type: NotificationItemEnum): string {
        if (type === NotificationItemEnum.EmotionNotificationType) {
            return ' is sharing';
        }
        if (type === NotificationItemEnum.StatusReplyNotificationType) {
            return ' is replying to status';
        }
        if (type === NotificationItemEnum.CheckOnMessageNotificationType) {
            return ' is checking on';
        }
        return '';
    }

    function getMessage(message: string, type: NotificationItemEnum): string {
        if (type === NotificationItemEnum.VoiceMessageNotificationType) {
            return '🎤 Voice Message';
        }
        return message;
    }

    const isNew = useMemo((): boolean => unseen && !pressed, [pressed, unseen]);

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={press}
            style={NotificationItemStyle.container}
        >
            <View style={NotificationItemStyle.profileView}>
                <View style={NotificationItemStyle.centerView}>
                    <ProfilePhoto
                        name={item.name}
                        size={48}
                        acronymStyle={NotificationItemStyle.profilePhoto}
                    />
                    <View style={NotificationItemStyle.contentView}>
                        <Text style={NotificationItemStyle.titleText}>
                            {item.name}
                            {getTitle(item.type)}
                        </Text>
                        <Text style={NotificationItemStyle.messageText}>
                            {getMessage(item?.message, item.type)} ∙{' '}
                            {getHourUnixTime(item?.time)}
                        </Text>
                    </View>
                    {isNew && <View style={NotificationItemStyle.newItem} />}
                </View>
            </View>
        </TouchableOpacity>
    );
};

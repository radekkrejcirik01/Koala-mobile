import React, { useCallback, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { NotificationItemEnum } from '@components/notifications/NotificationItem/NotificationItem.enum';
import { NotificationItemStyle } from '@components/notifications/NotificationItem/NotificationItem.style';
import { NotificationItemProps } from '@components/notifications/NotificationItem/NotificationItem.props';
import { getHourUnixTime } from '@functions/getHourUnixTime';
import { getShortMessage } from '@functions/getShortMessage';
import COLORS from '@constants/COLORS';

export const NotificationItem = ({
    item,
    onPress
}: NotificationItemProps): React.JSX.Element => {
    const [pressed, setPressed] = useState<boolean>(false);

    const press = useCallback(() => {
        onPress();
        setTimeout(() => {
            setPressed(true);
        }, 500);
    }, [onPress]);

    function getTitle(type: NotificationItemEnum): string {
        if (type === NotificationItemEnum.StatusReplyNotificationType) {
            return ' is replying to status';
        }
        if (type === NotificationItemEnum.CheckOnMessageNotificationType) {
            return ' is checking on';
        }
        return '';
    }

    function getMessage(
        type: NotificationItemEnum,
        isNew: boolean,
        message: string
    ): string {
        if (type === NotificationItemEnum.VoiceMessageNotificationType) {
            if (isNew) {
                return 'New voice message';
            }
            return '🎤 Voice Message';
        }
        if (isNew) {
            return 'New message';
        }
        return getShortMessage(message);
    }

    const isNew = useMemo(
        (): boolean => !item?.seen && !pressed,
        [item?.seen, pressed]
    );

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
                        <Text
                            style={[
                                NotificationItemStyle.titleText,
                                isNew && { color: COLORS.BLACK_50 }
                            ]}
                        >
                            {isNew && '💬 '}
                            {item.name}
                            {getTitle(item.type)}
                        </Text>
                        <Text
                            style={[
                                NotificationItemStyle.messageText,
                                isNew && NotificationItemStyle.newItemText
                            ]}
                        >
                            {getMessage(item.type, isNew, item?.message)} ∙{' '}
                            {getHourUnixTime(item?.time)}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

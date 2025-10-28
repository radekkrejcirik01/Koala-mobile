import React, { useCallback, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { NotificationItemEnum } from '@components/notifications/NotificationItem/NotificationItem.enum';
import { NotificationItemStyle } from '@components/notifications/NotificationItem/NotificationItem.style';
import { NotificationItemProps } from '@components/notifications/NotificationItem/NotificationItem.props';
import { getNotificationTime } from '@functions/getNotificationTime';
import { getShortMessage } from '@functions/getShortMessage';
import { useTheme } from '@contexts/ThemeContext';

export const NotificationItem = ({
  item,
  onPress
}: NotificationItemProps): React.JSX.Element => {
  const theme = useTheme();

  const [pressed, setPressed] = useState<boolean>(false);

  const press = useCallback(() => {
    onPress();
    setTimeout(() => {
      setPressed(true);
    }, 500);
  }, [onPress]);

  function getMessage(
    type: NotificationItemEnum,
    isUnseen: boolean,
    message: string
  ): string {
    if (type === NotificationItemEnum.VoiceMessageNotificationType) {
      if (isUnseen) {
        return 'New voice message';
      }
      return '🎤 Voice Message';
    }
    if (isUnseen) {
      return 'New message';
    }
    return getShortMessage(message);
  }

  const isUnseen = useMemo(
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
            photo={item?.profilePhoto}
            size={48}
            acronymStyle={NotificationItemStyle.profilePhoto}
          />
          <View style={NotificationItemStyle.contentView}>
            <Text
              style={[
                NotificationItemStyle.titleText,
                isUnseen && {
                  ...NotificationItemStyle.newItemText,
                  color: theme.theme.colors.text
                }
              ]}
            >
              {item.name}
            </Text>
            <Text
              style={[
                NotificationItemStyle.messageText,
                isUnseen && {
                  ...NotificationItemStyle.newItemText,
                  color: theme.theme.colors.text
                }
              ]}
            >
              {getMessage(item.type, isUnseen, item?.message)} ∙{' '}
              {getNotificationTime(item?.time)}
            </Text>
          </View>
          {isUnseen && <View style={NotificationItemStyle.newItem} />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

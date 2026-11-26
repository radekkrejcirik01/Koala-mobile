import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '@hooks/useTheme';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { useChatItemStyle } from '@components/chats/ChatItem/ChatItem.style';
import { ChatItemProps } from '@components/chats/ChatItem/ChatItem.props';
import { getNotificationTime } from '@functions/getNotificationTime';
import { getChatPreview } from '@functions/getChatPreview';
import { getFriendName } from '@functions/getFriendName';
import { ReducerProps } from '@store/index/index.props';

export const ChatItem = ({
  item,
  typing,
  onPress
}: ChatItemProps): React.JSX.Element => {
  const ChatItemStyle = useChatItemStyle();
  const theme = useTheme();

  const { id: userId } = useSelector((state: ReducerProps) => state.user.user);

  const { friend, lastActivity, unread } = item;

  return (
    // The whole row opens the chat, with the photo and the room around it
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={ChatItemStyle.container}
    >
      <View style={ChatItemStyle.profileView}>
        <View style={ChatItemStyle.centerView}>
          <ProfilePhoto
            name={friend.name}
            photo={friend?.profilePhoto}
            size={48}
            acronymStyle={ChatItemStyle.profilePhoto}
          />
          <View style={ChatItemStyle.contentView}>
            <Text
              numberOfLines={1}
              style={[
                ChatItemStyle.titleText,
                unread && {
                  ...ChatItemStyle.newItemText,
                  color: theme.theme.colors.text
                }
              ]}
            >
              {getFriendName(friend)}
            </Text>
            <View style={ChatItemStyle.messageView}>
              <Text
                numberOfLines={1}
                style={[
                  ChatItemStyle.messageText,
                  ChatItemStyle.previewText,
                  unread && {
                    ...ChatItemStyle.newItemText,
                    color: theme.theme.colors.text
                  }
                ]}
              >
                {typing ? 'typing…' : getChatPreview(item, userId)}
              </Text>
              {!typing && (
                <Text
                  style={[
                    ChatItemStyle.messageText,
                    unread && {
                      ...ChatItemStyle.newItemText,
                      color: theme.theme.colors.text
                    }
                  ]}
                >
                  {' '}
                  ∙{' '}
                  {getNotificationTime(Math.floor(lastActivity.timeMs / 1000))}
                </Text>
              )}
            </View>
          </View>
          {unread && <View style={ChatItemStyle.newItem} />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

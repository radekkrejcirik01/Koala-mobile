import React, { JSX, useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { ChatHeaderStyle } from '@components/chat/ChatHeader/ChatHeader.style';
import {
  ChatHeaderDefaultProps,
  ChatHeaderProps
} from '@components/chat/ChatHeader/ChatHeader.props';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { getRequest } from '@utils/Axios/Axios.service';
import { LiveService } from '@utils/general/LiveService';
import { ResponseLastOnlineGetInterface } from '@interfaces/response/Response.interface';
import { getChatOnlineStatus } from '@functions/getChatOnlineStatus';
import { BackButton } from '@components/general/BackButton/BackButton';
import { LiveEventType } from '@enums/LiveEventType';

interface OnlineStatus {
  online: boolean;
  // Last online in seconds
  time?: number;
}

export const ChatHeader = ({
  chatUserId,
  username,
  name,
  profilePhoto
}: ChatHeaderProps): JSX.Element => {
  const theme = useTheme();

  // Not loaded yet while undefined
  const [status, setStatus] = useState<OnlineStatus>();

  const getOnlineStatus = useCallback(() => {
    getRequest<ResponseLastOnlineGetInterface>(
      `last-online/${chatUserId}`
    ).subscribe((response: ResponseLastOnlineGetInterface) => {
      // Fails for an ex-friend (403), whose status is hidden. Any failure
      // keeps a status already shown
      setStatus((prevState) =>
        response?.status
          ? { online: !!response.online, time: response.time }
          : prevState ?? { online: false }
      );
    });
  }, [chatUserId]);

  useEffect(() => {
    getOnlineStatus();
  }, [getOnlineStatus]);

  // Presence may have changed while disconnected, also covers returning to
  // the foreground as the socket reconnects then
  useEffect(() => LiveService.onConnect(getOnlineStatus), [getOnlineStatus]);

  useEffect(
    () =>
      LiveService.subscribe((event) => {
        if (
          event.type === LiveEventType.Presence &&
          event.data.userId === chatUserId
        ) {
          setStatus({ online: event.data.online, time: event.data.lastOnline });
        }
      }),
    [chatUserId]
  );

  return (
    <View style={ChatHeaderStyle.container}>
      <View style={ChatHeaderStyle.centerRow}>
        <BackButton />
        <View style={ChatHeaderStyle.contentContainer}>
          <ProfilePhoto
            name={name}
            photo={profilePhoto}
            size={40}
            acronymStyle={ChatHeaderStyle.acronym}
          />
          <View style={ChatHeaderStyle.namesView}>
            <Text
              style={[
                ChatHeaderStyle.nameText,
                { color: theme.theme.colors.text }
              ]}
            >
              {name}
            </Text>
            <Text style={ChatHeaderStyle.usernameText}>
              {
                // Without a status the username fills the line, a space keeps
                // its height until loaded
                status
                  ? getChatOnlineStatus(status.online, status.time) || username
                  : ' '
              }
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

ChatHeader.defaultProps = ChatHeaderDefaultProps;

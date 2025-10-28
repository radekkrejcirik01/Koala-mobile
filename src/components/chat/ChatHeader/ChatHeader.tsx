import React, { JSX, useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useAppState } from '@hooks/useAppState';
import { ChatHeaderStyle } from '@components/chat/ChatHeader/ChatHeader.style';
import {
  ChatHeaderDefaultProps,
  ChatHeaderProps
} from '@components/chat/ChatHeader/ChatHeader.props';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { getRequest } from '@utils/Axios/Axios.service';
import { ResponseLastOnlineGetInterface } from '@interfaces/response/Response.interface';
import { getChatOnlineStatus } from '@functions/getChatOnlineStatus';
import { BackButton } from '@components/general/BackButton/BackButton';
import { useTheme } from '@contexts/ThemeContext';

export const ChatHeader = ({
  chatUserId,
  username,
  name,
  profilePhoto
}: ChatHeaderProps): JSX.Element => {
  const theme = useTheme();

  const [showUsername, setShowUsername] = useState<boolean>(true);
  const [lastOnline, setLastOnline] = useState<number>(0);

  const getLastOnlineTime = useCallback(() => {
    getRequest<ResponseLastOnlineGetInterface>(
      `last-online/${chatUserId}`
    ).subscribe((response: ResponseLastOnlineGetInterface) => {
      if (response?.status && !!response?.time) {
        setShowUsername(false);
        setLastOnline(response?.time);

        setTimeout(() => {
          setShowUsername(true);
        }, 7000);
      }
    });
  }, [chatUserId]);

  useAppState(getLastOnlineTime);

  useEffect(() => {
    getLastOnlineTime();
  }, [getLastOnlineTime]);

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
              {showUsername ? username : getChatOnlineStatus(lastOnline)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

ChatHeader.defaultProps = ChatHeaderDefaultProps;

import React, { JSX, useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@hooks/useNavigation';
import { useAppState } from '@hooks/useAppState';
import { ChatHeaderStyle } from '@components/chat/ChatHeader/ChatHeader.style';
import { ChatHeaderProps } from '@components/chat/ChatHeader/ChatHeader.props';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { getRequest } from '@utils/Axios/Axios.service';
import { ResponseLastOnlineGetInterface } from '@interfaces/response/Response.interface';
import { getChatOnlineStatus } from '@functions/getChatOnlineStatus';
import { BackButton } from '@components/general/BackButton/BackButton';

export const ChatHeader = ({
    id,
    username,
    name
}: ChatHeaderProps): JSX.Element => {
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    const [showUsername, setShowUsername] = useState<boolean>(true);
    const [lastOnline, setLastOnline] = useState<number>(0);

    const getLastOnlineTime = useCallback(() => {
        getRequest<ResponseLastOnlineGetInterface>(
            `last-online/${id}`
        ).subscribe((response: ResponseLastOnlineGetInterface) => {
            if (response?.status && !!response?.time) {
                setShowUsername(false);
                setLastOnline(response?.time);

                setTimeout(() => {
                    setShowUsername(true);
                }, 7000);
            }
        });
    }, [id]);

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
                        size={42}
                        acronymStyle={ChatHeaderStyle.acronym}
                    />
                    <View style={ChatHeaderStyle.namesView}>
                        <Text style={ChatHeaderStyle.nameText}>{name}</Text>
                        <Text style={ChatHeaderStyle.usernameText}>
                            🪴{' '}
                            {showUsername
                                ? username
                                : getChatOnlineStatus(lastOnline)}
                        </Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                activeOpacity={0.7}
                hitSlop={10}
                onPress={() =>
                    navigateTo(AccountStackNavigatorEnum.SharedScreen, {
                        receiverId: id
                    })
                }
                style={ChatHeaderStyle.sharedButtonView}
            >
                <Text style={ChatHeaderStyle.chatEmoji}>💬</Text>
            </TouchableOpacity>
        </View>
    );
};

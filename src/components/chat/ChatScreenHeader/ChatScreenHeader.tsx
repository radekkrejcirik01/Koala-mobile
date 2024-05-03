import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@hooks/useNavigation';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { ChatScreenHeaderStyle } from '@components/chat/ChatScreenHeader/ChatScreenHeader.style';
import { ChatScreenHeaderProps } from '@components/chat/ChatScreenHeader/ChatScreenHeader.props';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';

export const ChatScreenHeader = ({
    id,
    username,
    name
}: ChatScreenHeaderProps): JSX.Element => {
    const { navigateBack, navigateTo } = useNavigation(
        RootStackNavigatorEnum.AccountStack
    );

    return (
        <View style={ChatScreenHeaderStyle.container}>
            <View style={ChatScreenHeaderStyle.centerRow}>
                <TouchableOpacity activeOpacity={0.9} onPress={navigateBack}>
                    <Icon name={IconEnum.BACK_BLUE} size={22} />
                </TouchableOpacity>
                <View style={ChatScreenHeaderStyle.contentContainer}>
                    <ProfilePhoto name={name} size={42} />
                    <View style={ChatScreenHeaderStyle.namesView}>
                        <Text style={ChatScreenHeaderStyle.nameText}>
                            {name}
                        </Text>
                        <Text style={ChatScreenHeaderStyle.usernameText}>
                            💬 {username}
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
                style={ChatScreenHeaderStyle.sharedButtonView}
            >
                <Icon name={IconEnum.REPLY} size={28} />
            </TouchableOpacity>
        </View>
    );
};

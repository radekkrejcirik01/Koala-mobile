import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@hooks/useNavigation';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { RespondScreenHeaderStyle } from '@components/respond/RespondScreenHeader/RespondScreenHeader.style';
import { RespondScreenHeaderProps } from '@components/respond/RespondScreenHeader/RespondScreenHeader.props';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';

export const RespondScreenHeader = ({
    name,
    userId
}: RespondScreenHeaderProps): JSX.Element => {
    const { navigateBack, navigateTo } = useNavigation(
        RootStackNavigatorEnum.AccountStack
    );

    return (
        <View style={RespondScreenHeaderStyle.container}>
            <View style={RespondScreenHeaderStyle.centerRow}>
                <TouchableOpacity activeOpacity={0.9} onPress={navigateBack}>
                    <Icon name={IconEnum.BACK_BLUE} size={24} />
                </TouchableOpacity>
                <View style={RespondScreenHeaderStyle.contentContainer}>
                    <ProfilePhoto name={name} size={40} />
                    <Text style={RespondScreenHeaderStyle.nameText}>
                        {name}
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                activeOpacity={0.7}
                hitSlop={10}
                onPress={() =>
                    navigateTo(AccountStackNavigatorEnum.SharedScreen, {
                        receiverId: userId
                    })
                }
                style={RespondScreenHeaderStyle.sharedButtonView}
            >
                <Icon name={IconEnum.REPLY} size={26} />
            </TouchableOpacity>
        </View>
    );
};

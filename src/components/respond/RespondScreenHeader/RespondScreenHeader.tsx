import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { RespondScreenHeaderStyle } from '@components/respond/RespondScreenHeader/RespondScreenHeader.style';
import { RespondScreenHeaderProps } from '@components/respond/RespondScreenHeader/RespondScreenHeader.props';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';

export const RespondScreenHeader = ({
    name,
    username
}: RespondScreenHeaderProps): JSX.Element => {
    const navigation = useNavigation();

    return (
        <View style={RespondScreenHeaderStyle.container}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.goBack()}
            >
                <Icon name={IconEnum.BACK_BLUE} size={24} />
            </TouchableOpacity>
            <View style={RespondScreenHeaderStyle.contentContainer}>
                <ProfilePhoto name={name} size={40} />
                <View style={RespondScreenHeaderStyle.nameContainer}>
                    <Text style={RespondScreenHeaderStyle.nameText}>
                        {name}
                    </Text>
                    <Text style={RespondScreenHeaderStyle.usernameText}>
                        {username}
                    </Text>
                </View>
            </View>
        </View>
    );
};

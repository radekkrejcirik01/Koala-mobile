import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@hooks/useNavigation';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { SharedScreenHeaderStyle } from '@components/chat/SharedScreenHeader/SharedScreenHeader.style';

export const SharedScreenHeader = (): React.JSX.Element => {
    const { navigateBack } = useNavigation(RootStackNavigatorEnum.AccountStack);

    return (
        <View style={SharedScreenHeaderStyle.container}>
            <TouchableOpacity activeOpacity={0.9} onPress={navigateBack}>
                <Icon name={IconEnum.BACK_BLUE} size={24} />
            </TouchableOpacity>
            <Text style={SharedScreenHeaderStyle.titleText}>All shared</Text>
        </View>
    );
};

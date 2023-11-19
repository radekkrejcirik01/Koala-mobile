import React from 'react';
import { useNavigation } from '@hooks/useNavigation';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { ScreenHeaderProps } from '@components/general/ScreenHeader/ScreenHeader.props';
import { ScreenHeaderStyle } from '@components/general/ScreenHeader/ScreenHeader.style';

export const ScreenHeader = ({
    title
}: ScreenHeaderProps): React.JSX.Element => {
    const { navigateBack } = useNavigation();

    return (
        <View style={ScreenHeaderStyle.container}>
            <TouchableOpacity activeOpacity={0.9} onPress={navigateBack}>
                <Icon name={IconEnum.BACK_BLUE} size={25} />
            </TouchableOpacity>
            <Text style={ScreenHeaderStyle.titleText}>{title}</Text>
        </View>
    );
};

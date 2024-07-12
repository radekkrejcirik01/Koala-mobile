import React from 'react';
import { Text, View } from 'react-native';
import { ScreenHeaderProps } from '@components/general/ScreenHeader/ScreenHeader.props';
import { ScreenHeaderStyle } from '@components/general/ScreenHeader/ScreenHeader.style';
import { BackButton } from '@components/general/BackButton/BackButton';

export const ScreenHeader = ({
    title
}: ScreenHeaderProps): React.JSX.Element => (
    <View style={ScreenHeaderStyle.container}>
        <BackButton />
        <Text style={ScreenHeaderStyle.titleText}>{title}</Text>
    </View>
);

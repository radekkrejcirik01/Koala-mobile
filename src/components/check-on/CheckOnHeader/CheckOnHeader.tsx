import React, { JSX } from 'react';
import { Text, View } from 'react-native';
import { CheckOnHeaderProps } from '@components/check-on/CheckOnHeader/CheckOnHeader.props';
import { AddButton } from '@components/general/AddButton/AddButton';
import { CheckOnHeaderStyle } from '@components/check-on/CheckOnHeader/CheckOnHeader.style';

export const CheckOnHeader = ({
    onPressAdd
}: CheckOnHeaderProps): JSX.Element => (
    <View style={CheckOnHeaderStyle.container}>
        <View style={CheckOnHeaderStyle.flex} />
        <Text style={CheckOnHeaderStyle.titleText}>Check-on</Text>
        <View style={[CheckOnHeaderStyle.flex, { alignItems: 'flex-end' }]}>
            <AddButton onPress={onPressAdd} />
        </View>
    </View>
);

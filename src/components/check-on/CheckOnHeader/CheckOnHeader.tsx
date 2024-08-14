import React, { JSX } from 'react';
import { Text, View } from 'react-native';
import { CheckOnHeaderStyle } from '@components/check-on/CheckOnHeader/CheckOnHeader.style';
import { CheckOnHeaderProps } from '@components/check-on/CheckOnHeader/CheckOnHeader.props';
import { AddButton } from '@components/general/AddButton/AddButton';

export const CheckOnHeader = ({
    onPressAdd
}: CheckOnHeaderProps): JSX.Element => (
    <View style={CheckOnHeaderStyle.container}>
        <Text style={CheckOnHeaderStyle.title}>Check on 🙋</Text>
        <AddButton onPress={onPressAdd} />
    </View>
);

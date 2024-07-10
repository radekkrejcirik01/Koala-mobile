import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CheckOnHeaderStyle } from '@components/check-on/CheckOnHeader/CheckOnHeader.style';
import { CheckOnHeaderProps } from '@components/check-on/CheckOnHeader/CheckOnHeader.props';

export const CheckOnHeader = ({
    onPressAdd
}: CheckOnHeaderProps): JSX.Element => (
    <View style={CheckOnHeaderStyle.container}>
        <Text style={CheckOnHeaderStyle.title}>🙋 Check-on</Text>
        <TouchableOpacity activeOpacity={0.8} hitSlop={10} onPress={onPressAdd}>
            <Text style={CheckOnHeaderStyle.buttonText}>Add +</Text>
        </TouchableOpacity>
    </View>
);

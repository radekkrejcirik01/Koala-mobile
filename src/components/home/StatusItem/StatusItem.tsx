import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StatusItemStyle } from '@components/home/StatusItem/StatusItem.style';
import { StatusItemProps } from '@components/home/StatusItem/StatusItem.props';

export const StatusItem = ({
    onPress,
    name,
    expression
}: StatusItemProps): JSX.Element => (
    <View style={StatusItemStyle.container}>
        <TouchableOpacity
            activeOpacity={0.7}
            hitSlop={10}
            onPress={onPress}
            style={StatusItemStyle.button}
        >
            <Text style={StatusItemStyle.expressionText}>{expression}</Text>
        </TouchableOpacity>
        <Text style={StatusItemStyle.nameText}>{name}</Text>
    </View>
);

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ExpressionItemStyle } from '@components/home/ExpressionItem/ExpressionItem.style';
import { ExpressionItemProps } from '@components/home/ExpressionItem/ExpressionItem.props';

export const ExpressionItem = ({
    onPress,
    name,
    expression
}: ExpressionItemProps): React.JSX.Element => (
    <View style={ExpressionItemStyle.container}>
        <TouchableOpacity
            activeOpacity={0.7}
            hitSlop={10}
            onPress={onPress}
            style={ExpressionItemStyle.button}
        >
            <Text style={ExpressionItemStyle.text}>{expression}</Text>
        </TouchableOpacity>
        <Text>{name}</Text>
    </View>
);

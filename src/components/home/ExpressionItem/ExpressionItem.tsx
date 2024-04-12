import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import COLORS from '@constants/COLORS';

interface ExpressionItemProps {
    onPress: () => void;
    name: string;
    expression: string;
}

export const ExpressionItem = ({
    onPress,
    name,
    expression
}: ExpressionItemProps): React.JSX.Element => (
    <TouchableOpacity
        activeOpacity={0.7}
        hitSlop={10}
        onPress={onPress}
        style={{
            marginLeft: 5,
            paddingVertical: 8,
            paddingHorizontal: 10,
            borderRadius: 20,
            backgroundColor: '#00000010',
            alignSelf: 'flex-start'
        }}
    >
        <Text style={{ fontSize: 16, color: COLORS.BLACK, fontWeight: '500' }}>
            {name} {expression}
        </Text>
    </TouchableOpacity>
);

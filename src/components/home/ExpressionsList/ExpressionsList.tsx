import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { ExpressionItem } from '@components/home/ExpressionItem/ExpressionItem';
import { ExpressionsListProps } from '@components/home/ExpressionsList/ExpressionsList.props';
import { ExpressionsListStyle } from '@components/home/ExpressionsList/ExpressionsList.style';

export const ExpressionsList = ({
    data,
    status,
    onStatusPress,
    onStatusReply
}: ExpressionsListProps): React.JSX.Element => (
    <ScrollView horizontal style={ExpressionsListStyle.scrollView}>
        <TouchableOpacity
            activeOpacity={0.7}
            hitSlop={10}
            onPress={onStatusPress}
            style={ExpressionsListStyle.statusButtonView}
        >
            <Text style={ExpressionsListStyle.statusButtonText}>
                {status || 'Status'}
            </Text>
        </TouchableOpacity>
        {!!data &&
            data.map((value) => (
                <ExpressionItem
                    key={value.userId}
                    onPress={() => onStatusReply(value)}
                    name={value?.name}
                    expression={value?.expression}
                />
            ))}
    </ScrollView>
);

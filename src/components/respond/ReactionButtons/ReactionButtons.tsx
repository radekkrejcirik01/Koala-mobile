import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
    ReactionButtonInterface,
    ReactionButtonsProps
} from '@components/respond/ReactionButtons/ReactionButtons.props';
import { ReactionButtonsStyle } from '@components/respond/ReactionButtons/ReactionButtons.style';

export const ReactionButtons = ({ onPressReaction }: ReactionButtonsProps) => {
    const list: ReactionButtonInterface[] = [
        {
            id: 1,
            message: 'Sending support ❤️'
        },
        {
            id: 2,
            message: 'I am here 🫶'
        },
        {
            id: 3,
            message: 'What happened?'
        },
        {
            id: 4,
            message: 'You got this!'
        },
        {
            id: 5,
            message: 'Can I do something?'
        }
    ];

    return (
        <View style={ReactionButtonsStyle.container}>
            {list.map((value) => (
                <TouchableOpacity
                    key={value.id}
                    activeOpacity={0.9}
                    onPress={() => onPressReaction(value.message)}
                    style={ReactionButtonsStyle.buttonView}
                >
                    <Text style={ReactionButtonsStyle.buttonText}>
                        {value.message}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

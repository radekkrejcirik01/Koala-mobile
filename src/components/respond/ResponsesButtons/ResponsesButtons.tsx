import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
    ResponseButtonInterface,
    ResponsesButtonsProps
} from '@components/respond/ResponsesButtons/ResponsesButtons.props';
import { ResponsesButtonsStyle } from '@components/respond/ResponsesButtons/ResponsesButtons.style';

export const ResponsesButtons = ({ onPressButton }: ResponsesButtonsProps) => {
    const list: ResponseButtonInterface[] = [
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
        <View style={ResponsesButtonsStyle.container}>
            {list.map((value) => (
                <TouchableOpacity
                    key={value.id}
                    activeOpacity={0.9}
                    onPress={() => onPressButton(value.message)}
                    style={ResponsesButtonsStyle.buttonView}
                >
                    <Text style={ResponsesButtonsStyle.buttonText}>
                        {value.message}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

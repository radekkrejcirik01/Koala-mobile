import React, { JSX } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
    MessagesCardDefaultProps,
    MessagesCardProps
} from '@components/home/MessagesCard/MessagesCard.props';
import { MessagesCardStyle } from '@components/home/MessagesCard/MessagesCard.style';
import COLORS from '@constants/COLORS';

export const MessagesCard = ({
    title,
    onPress,
    image,
    imageStyle,
    isKudos
}: MessagesCardProps): JSX.Element => (
    <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={[
            MessagesCardStyle.view,
            isKudos && { backgroundColor: COLORS.PURPLE }
        ]}
    >
        <Text
            style={[MessagesCardStyle.text, isKudos && { color: COLORS.WHITE }]}
        >
            {title}
        </Text>
        <FastImage source={image} style={imageStyle} />
    </TouchableOpacity>
);

MessagesCard.defaultProps = MessagesCardDefaultProps;

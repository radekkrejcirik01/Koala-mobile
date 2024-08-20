import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LastlySharedCardProps } from '@components/home/LastlySharedCard/LastlySharedCard.props';
import { LastlySharedCardStyle } from '@components/home/LastlySharedCard/LastlySharedCard.style';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';

export const LastlySharedCard = ({
    onPress,
    title
}: LastlySharedCardProps): JSX.Element => (
    <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={LastlySharedCardStyle.view}
    >
        <Text style={LastlySharedCardStyle.title}>{title}</Text>
        <View style={LastlySharedCardStyle.button}>
            <Icon name={IconEnum.DIRECT} size={20} />
        </View>
    </TouchableOpacity>
);

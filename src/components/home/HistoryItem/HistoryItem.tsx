import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { HistoryItemProps } from '@components/home/HistoryItem/HistoryItem.props';
import { ReducerProps } from '@store/index/index.props';
import { HistoryItemStyle } from '@components/home/HistoryItem/HistoryItem.style';
import { getLocalTimeFromUTCUnix } from '@functions/getLocalTimeFromUTCUnix';

export const HistoryItem = ({ item }: HistoryItemProps): JSX.Element => {
    const { name } = useSelector((state: ReducerProps) => state.user.user);

    function getReceiversNamesText(names: string[]): string {
        return names?.join(', ');
    }

    return (
        <TouchableOpacity activeOpacity={1} style={HistoryItemStyle.container}>
            <ProfilePhoto name={name} size={40} />
            <View style={HistoryItemStyle.textsView}>
                <View style={HistoryItemStyle.rowView}>
                    <Text style={HistoryItemStyle.messageText}>
                        {item.message}
                    </Text>
                    <Text>{getLocalTimeFromUTCUnix(item?.time)}</Text>
                </View>
                <Text>
                    Sent to {getReceiversNamesText(item?.receiversNames)}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { HistoryItemProps } from '@components/profile/HistoryItem/HistoryItem.props';
import { HistoryItemStyle } from '@components/profile/HistoryItem/HistoryItem.style';
import { getLocalTimeFromUTCUnix } from '@functions/getLocalTimeFromUTCUnix';

export const HistoryItem = ({ item }: HistoryItemProps): JSX.Element => {
    function getReceiversNamesText(names: string[]): string {
        return names?.join(', ');
    }

    return (
        <TouchableOpacity activeOpacity={1} style={HistoryItemStyle.container}>
            <View style={HistoryItemStyle.textsView}>
                <View style={HistoryItemStyle.rowView}>
                    <Text style={HistoryItemStyle.messageText}>
                        {item.message}
                    </Text>
                    <Text style={HistoryItemStyle.timeText}>
                        {getLocalTimeFromUTCUnix(item?.time)}
                    </Text>
                </View>
                <Text style={HistoryItemStyle.sharedToText}>
                    shared to {getReceiversNamesText(item?.receiversNames)}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

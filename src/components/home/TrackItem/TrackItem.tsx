import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TrackItemProps } from '@components/home/TrackItem/TrackItem.props';
import { TrackItemStyle } from '@components/home/TrackItem/TrackItem.style';
import { getLocalTimeFromUTCUnix } from '@functions/getLocalTimeFromUTCUnix';

export const TrackItem = ({ item }: TrackItemProps): JSX.Element => {
    function getReceiversNamesText(names: string[]): string {
        return names?.join(', ');
    }

    return (
        <TouchableOpacity activeOpacity={1} style={TrackItemStyle.container}>
            <View style={TrackItemStyle.textsView}>
                <View style={TrackItemStyle.rowView}>
                    <Text style={TrackItemStyle.messageText}>
                        {item.message}
                    </Text>
                    <Text style={TrackItemStyle.timeText}>
                        {getLocalTimeFromUTCUnix(item?.time)}
                    </Text>
                </View>
                <Text style={TrackItemStyle.sharedToText}>
                    shared to {getReceiversNamesText(item?.receiversNames)}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

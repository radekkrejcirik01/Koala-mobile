import React, { JSX, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import TrackPlayer, { Event, State } from 'react-native-track-player';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import {
    AudioMessageItemDefaultProps,
    AudioMessageItemProps
} from '@components/chat/AudioMessageItem/AudioMessageItem.props';
import { AudioMessageItemStyle } from '@components/chat/AudioMessageItem/AudioMessageItem.style';

export const AudioMessageItem = ({
    audioMessage,
    outbound
}: AudioMessageItemProps): JSX.Element => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const play = async () => {
        await TrackPlayer.add({
            url: audioMessage,
            title: '🎤 Voice Message'
        });

        await TrackPlayer.play();

        setIsPlaying(true);

        TrackPlayer.addEventListener(Event.PlaybackState, ({ state }) => {
            if (state === State.Ended) {
                setIsPlaying(false);
            }
        });
    };

    const stop = async () => {
        await TrackPlayer.reset();

        setIsPlaying(false);
    };

    return (
        <View
            style={[
                AudioMessageItemStyle.view,
                outbound && AudioMessageItemStyle.outbound
            ]}
        >
            <Text style={AudioMessageItemStyle.text}>🎤 Voice message</Text>
            {isPlaying ? (
                <TouchableOpacity
                    activeOpacity={0.9}
                    hitSlop={10}
                    onPress={stop}
                    style={AudioMessageItemStyle.icon}
                >
                    <Icon name={IconEnum.STOP} size={26} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    activeOpacity={0.9}
                    hitSlop={10}
                    onPress={play}
                    style={AudioMessageItemStyle.icon}
                >
                    <Icon name={IconEnum.PLAY} size={26} />
                </TouchableOpacity>
            )}
        </View>
    );
};

AudioMessageItem.defaultProps = AudioMessageItemDefaultProps;

import React, { JSX, useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Sound from 'react-native-sound';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { AudioMessageItemProps } from '@components/chat/AudioMessageItem/AudioMessageItem.props';
import { AudioMessageItemStyle } from '@components/chat/AudioMessageItem/AudioMessageItem.style';

export const AudioMessageItem = ({
    audioMessage
}: AudioMessageItemProps): JSX.Element => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [sound, setSound] = useState<Sound>();

    const play = useCallback(async () => {
        setIsPlaying(true);
        const voiceMessage = new Sound(audioMessage, null, (error) => {
            if (error) {
                setIsPlaying(false);
                return;
            }

            setSound(voiceMessage);
            voiceMessage.play(() => {
                setIsPlaying(false);
                voiceMessage.release();
            });
        });
    }, [audioMessage]);

    const stop = useCallback(async () => {
        setIsPlaying(false);
        sound.stop(() => {
            setSound(null);
        });
    }, [sound]);

    return (
        <View style={AudioMessageItemStyle.view}>
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

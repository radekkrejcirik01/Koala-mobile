import React, { JSX, useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import {
    AudioMessageItemDefaultProps,
    AudioMessageItemProps
} from '@components/chat/AudioMessageItem/AudioMessageItem.props';
import { AudioMessageItemStyle } from '@components/chat/AudioMessageItem/AudioMessageItem.style';
import COLORS from '@constants/COLORS';

export const AudioMessageItem = ({
    onPlayAudioMessage,
    outbound
}: AudioMessageItemProps): JSX.Element => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const play = useCallback(() => {
        onPlayAudioMessage();

        setIsPlaying(true);
    }, [onPlayAudioMessage]);

    return (
        <View
            style={[
                AudioMessageItemStyle.view,
                outbound && AudioMessageItemStyle.outbound
            ]}
        >
            <Text style={AudioMessageItemStyle.text}>🎤 Audio message</Text>
            {isPlaying ? (
                <AnimatedCircularProgress
                    size={30}
                    width={5}
                    fill={100}
                    rotation={0}
                    duration={5000}
                    tintColor={COLORS.BUTTON_BLUE}
                    backgroundColor={COLORS.WHITE}
                    onAnimationComplete={() => setIsPlaying(false)}
                />
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

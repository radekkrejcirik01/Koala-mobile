import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Easing, Text, TouchableOpacity, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useTimer } from '@hooks/useTimer';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { RecordingInputStyle } from '@components/chat/RecordingInput/RecordingInput.style';
import { RecordingInputProps } from '@components/chat/RecordingInput/RecordingInput.props';
import COLORS from '@constants/COLORS';

export const RecordingInput = ({
    onStopRecording,
    onPressSend,
    onPressPlay,
    onPressClean
}: RecordingInputProps): React.JSX.Element => {
    const [stopped, setStopped] = useState<boolean>(false);

    const progressAnimationRef = useRef(null);

    useEffect(() => {
        progressAnimationRef?.current?.animate(100, 15000, Easing.quad);
    }, []);

    const stop = useCallback(() => {
        onStopRecording();

        setStopped(true);
    }, [onStopRecording]);

    useTimer(15, stop, !stopped);

    return (
        <View style={RecordingInputStyle.container}>
            <View style={RecordingInputStyle.centerRow}>
                {stopped ? (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        hitSlop={10}
                        onPress={onPressClean}
                    >
                        <Icon name={IconEnum.CLEAN} size={24} />
                    </TouchableOpacity>
                ) : (
                    <AnimatedCircularProgress
                        ref={progressAnimationRef}
                        size={30}
                        width={5}
                        fill={100}
                        rotation={0}
                        tintColor={COLORS.BUTTON_BLUE}
                        backgroundColor={COLORS.WHITE}
                    />
                )}
                <TouchableOpacity
                    activeOpacity={0.9}
                    hitSlop={10}
                    disabled={!stopped}
                    onPress={onPressPlay}
                    style={RecordingInputStyle.titleText}
                >
                    <Text>{stopped ? 'Play message' : 'Recording...'}</Text>
                </TouchableOpacity>
            </View>
            {stopped ? (
                <TouchableOpacity
                    activeOpacity={0.9}
                    hitSlop={10}
                    onPress={onPressSend}
                    style={RecordingInputStyle.sendButtonView}
                >
                    <Icon
                        name={IconEnum.SEND}
                        size={22}
                        style={RecordingInputStyle.sendButtonIcon}
                    />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    activeOpacity={0.9}
                    hitSlop={10}
                    onPress={stop}
                    style={RecordingInputStyle.centerRow}
                >
                    <Icon name={IconEnum.STOP} size={26} />
                </TouchableOpacity>
            )}
        </View>
    );
};

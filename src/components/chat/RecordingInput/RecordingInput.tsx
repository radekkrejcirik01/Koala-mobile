import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { RecordingTimer } from '@components/chat/RecrodingTimer/RecordingTimer';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { RecordingInputStyle } from '@components/chat/RecordingInput/RecordingInput.style';
import { RecordingInputProps } from '@components/chat/RecordingInput/RecordingInput.props';

export const RecordingInput = ({
    onStopRecording,
    onPressSend,
    onPressPlay,
    onPressClean,
    sendDisabled
}: RecordingInputProps): React.JSX.Element => {
    const [stopped, setStopped] = useState<boolean>(false);

    const timerRef = useRef(null);

    useEffect(() => {
        timerRef.current.startTimer();
    }, []);

    const stop = useCallback(() => {
        onStopRecording();

        setStopped(true);

        timerRef.current.stopTimer();
    }, [onStopRecording]);

    return (
        <View style={RecordingInputStyle.container}>
            <View style={RecordingInputStyle.centerRow}>
                {stopped && (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        hitSlop={10}
                        disabled={sendDisabled}
                        onPress={onPressClean}
                    >
                        <Icon name={IconEnum.CLEAN} size={24} />
                    </TouchableOpacity>
                )}
                <RecordingTimer ref={timerRef} onLimitExceeded={stop} />
                <TouchableOpacity
                    activeOpacity={0.9}
                    hitSlop={10}
                    disabled={!stopped}
                    onPress={onPressPlay}
                >
                    <Text>{stopped ? 'Play message' : 'Recording...'}</Text>
                </TouchableOpacity>
            </View>
            {stopped ? (
                <TouchableOpacity
                    activeOpacity={0.9}
                    hitSlop={10}
                    disabled={sendDisabled}
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

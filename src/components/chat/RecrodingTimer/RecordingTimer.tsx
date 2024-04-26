import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState
} from 'react';
import { Text, View } from 'react-native';
import { formatTimerTime } from '@functions/formatTimerTime';
import { RecordingTimerProps } from '@components/chat/RecrodingTimer/RecordingTimer.props';
import { RecordingTimerStyle } from '@components/chat/RecrodingTimer/RecordingTimer.style';

export const RecordingTimer = forwardRef(
    ({ onLimitExceeded }: RecordingTimerProps, ref): React.JSX.Element => {
        const [seconds, setSeconds] = useState(0);
        const [isActive, setIsActive] = useState(false);

        useImperativeHandle(ref, () => ({
            startTimer() {
                setIsActive(true);
            },
            stopTimer() {
                setIsActive(false);
            }
        }));

        useEffect(() => {
            let intervalId: string | number | NodeJS.Timeout = null;

            if (isActive) {
                intervalId = setInterval(() => {
                    setSeconds((prevSeconds) => prevSeconds + 1);
                }, 1000);
            } else {
                clearInterval(intervalId);
            }

            return () => clearInterval(intervalId);
        }, [isActive]);

        useEffect(() => {
            if (seconds === 20) {
                onLimitExceeded();
            }
        }, [onLimitExceeded, seconds]);

        return (
            <View style={RecordingTimerStyle.view}>
                <Text style={RecordingTimerStyle.text}>
                    {formatTimerTime(seconds)}
                </Text>
            </View>
        );
    }
);

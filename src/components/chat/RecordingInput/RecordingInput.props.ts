export interface RecordingInputProps {
    onStopRecording: () => void;
    onPressSend: () => void;
    onPressPlay: () => void;
    onPressClean: () => void;
    sendDisabled: boolean;
}

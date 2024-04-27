import React, { useCallback, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import fs from 'react-native-fs';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { ReactionButtons } from '@components/chat/ReactionButtons/ReactionButtons';
import { ChatInputStyle } from '@components/chat/ChatInput/ChatInput.style';
import { ChatInputProps } from '@components/chat/ChatInput/ChatInput.props';
import COLORS from '@constants/COLORS';
import { RecordingInput } from '@components/chat/RecordingInput/RecordingInput';

const audioRecorderPlayer = new AudioRecorderPlayer();

export const ChatInput = ({
    message,
    onChangeText,
    onPressSend,
    onPressReaction,
    onAudioRecord,
    replyMessage,
    inputRef,
    onFocus,
    onDismissReply,
    showReactionsButtons
}: ChatInputProps): React.JSX.Element => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [record, setRecord] = useState<string>();

    const startRecording = useCallback(async () => {
        setIsRecording(true);

        const path = Platform.select({
            ios: 'audio.m4a',
            android: `${fs.CachesDirectoryPath}/audio.mp3`
        });

        const uri = await audioRecorderPlayer.startRecorder(path);

        audioRecorderPlayer.addRecordBackListener(() => {});

        onAudioRecord(uri);
        setRecord(uri);
    }, [onAudioRecord]);

    const stopRecord = async () => {
        await audioRecorderPlayer.stopRecorder();

        audioRecorderPlayer.removeRecordBackListener();
    };

    const stopRecording = useCallback(() => {
        stopRecord().catch();
    }, []);

    const sendVoiceMessage = useCallback(() => {
        onPressSend();

        setIsRecording(false);
    }, [onPressSend]);

    const playRecord = useCallback(async () => {
        await audioRecorderPlayer.startPlayer(record);
    }, [record]);

    const cleanRecording = useCallback(() => {
        onAudioRecord('');

        setIsRecording(false);
        setRecord(null);
    }, [onAudioRecord]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        >
            {!!replyMessage && (
                <View style={ChatInputStyle.replyMessageContainer}>
                    <View style={ChatInputStyle.replyingToContainer}>
                        <Text style={ChatInputStyle.replyingToText}>
                            Replying to
                        </Text>
                        <TouchableOpacity
                            onPress={onDismissReply}
                            style={ChatInputStyle.dismissButtonView}
                        >
                            <Icon name={IconEnum.CLEAN} size={20} />
                        </TouchableOpacity>
                    </View>
                    <Text style={ChatInputStyle.replyMessageText}>
                        {replyMessage}
                    </Text>
                </View>
            )}
            {showReactionsButtons && (
                <ReactionButtons onPressReaction={onPressReaction} />
            )}
            <View style={ChatInputStyle.inputContainer}>
                {isRecording ? (
                    <RecordingInput
                        onStopRecording={stopRecording}
                        onPressSend={sendVoiceMessage}
                        onPressPlay={playRecord}
                        onPressClean={cleanRecording}
                    />
                ) : (
                    <TouchableOpacity
                        activeOpacity={1}
                        hitSlop={10}
                        onPress={() => inputRef.current.focus()}
                        style={ChatInputStyle.inputView}
                    >
                        <TextInput
                            ref={inputRef}
                            autoCorrect={false}
                            multiline
                            onFocus={onFocus}
                            value={message}
                            onChangeText={onChangeText}
                            placeholder="Message..."
                            selectionColor={COLORS.BUTTON_BLUE}
                            style={ChatInputStyle.input}
                        />
                        <TouchableOpacity
                            activeOpacity={0.9}
                            disabled={!message}
                            hitSlop={10}
                            onPress={onPressSend}
                            style={ChatInputStyle.sendButtonView}
                        >
                            <Icon
                                name={IconEnum.SEND}
                                size={22}
                                style={ChatInputStyle.sendButtonIcon}
                            />
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
                {!isRecording && (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        hitSlop={10}
                        onPress={startRecording}
                        style={ChatInputStyle.microphoneButtonView}
                    >
                        <Icon name={IconEnum.MICROPHONE} size={26} />
                    </TouchableOpacity>
                )}
            </View>
        </KeyboardAvoidingView>
    );
};

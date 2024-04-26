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
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseRecordingPostInterface } from '@interfaces/response/Response.interface';
import { RecordingPostInterface } from '@interfaces/post/Post.interface';
import { RecordingInput } from '@components/chat/RecordingInput/RecordingInput';

const audioRecorderPlayer = new AudioRecorderPlayer();

export const ChatInput = ({
    message,
    onChangeText,
    onPressSend,
    onPressReaction,
    onAudioMessageUrl,
    replyMessage,
    inputRef,
    onFocus,
    onDismissReply,
    showReactionsButtons
}: ChatInputProps): React.JSX.Element => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [record, setRecord] = useState<string>();
    const [audioUploaded, setAudioUploaded] = useState<boolean>(false);

    const startRecording = useCallback(async () => {
        setIsRecording(true);

        const path = Platform.select({
            ios: 'audio.m4a',
            android: `${fs.CachesDirectoryPath}/audio.mp3`
        });

        const uri = await audioRecorderPlayer.startRecorder(path);

        audioRecorderPlayer.addRecordBackListener(() => {});

        setRecord(uri);
    }, []);

    const stopRecord = async () => {
        await audioRecorderPlayer.stopRecorder();

        audioRecorderPlayer.removeRecordBackListener();
    };

    const uploadRecord = useCallback(async () => {
        const base64Buffer = await fs.readFile(record, 'base64');

        postRequest<ResponseRecordingPostInterface, RecordingPostInterface>(
            'recording',
            {
                buffer: base64Buffer,
                platform: Platform.OS
            }
        ).subscribe(async (response) => {
            onAudioMessageUrl(response.url);
            setAudioUploaded(true);
        });
    }, [onAudioMessageUrl, record]);

    const stopRecording = useCallback(() => {
        stopRecord().catch();
        uploadRecord().catch();
    }, [uploadRecord]);

    const sendVoiceMessage = useCallback(() => {
        onPressSend();

        setIsRecording(false);
        setAudioUploaded(false);
    }, [onPressSend]);

    const playRecord = useCallback(async () => {
        await audioRecorderPlayer.startPlayer(record);
    }, [record]);

    const cleanRecording = useCallback(() => {
        onAudioMessageUrl('');

        setIsRecording(false);
        setRecord(null);
        setAudioUploaded(false);
    }, [onAudioMessageUrl]);

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
                        sendDisabled={!audioUploaded}
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

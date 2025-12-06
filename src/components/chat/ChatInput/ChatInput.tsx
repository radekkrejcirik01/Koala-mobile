import React, { useCallback, useState } from 'react';
import {
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
import { Replies } from '@components/chat/Replies/Replies';
import { ChatInputStyle } from '@components/chat/ChatInput/ChatInput.style';
import { ChatInputProps } from '@components/chat/ChatInput/ChatInput.props';
import COLORS from '@constants/COLORS';
import { RecordingInput } from '@components/chat/RecordingInput/RecordingInput';
import { checkAndroidRecordingPermission } from '@functions/checkAndroidRecordingPermission';
import { useTheme } from '@contexts/ThemeContext';

const audioRecorderPlayer = new AudioRecorderPlayer();

export const ChatInput = ({
  message,
  onChangeText,
  onPressSend,
  onPressReply,
  onAudioRecord,
  replyMessage,
  inputRef,
  onFocus,
  onDismissReply,
  showReplies
}: ChatInputProps): React.JSX.Element => {
  const theme = useTheme();

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [record, setRecord] = useState<string>();
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const startRecording = useCallback(async () => {
    await checkAndroidRecordingPermission();

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
    <View>
      {!!replyMessage && (
        <View
          style={[
            ChatInputStyle.replyMessageContainer,
            { backgroundColor: theme.isDark ? COLORS.BLACK : COLORS.WHITE }
          ]}
        >
          <View style={ChatInputStyle.replyingToContainer}>
            <Text style={ChatInputStyle.replyingToText}>Replying to</Text>
            <TouchableOpacity
              onPress={onDismissReply}
              style={ChatInputStyle.dismissButtonView}
            >
              <Icon name={IconEnum.CLEAN} size={20} />
            </TouchableOpacity>
          </View>
          <Text
            style={[
              ChatInputStyle.replyMessageText,
              { color: theme.theme.colors.text }
            ]}
          >
            {replyMessage}
          </Text>
        </View>
      )}
      {showReplies && !isFocused && <Replies onPressReply={onPressReply} />}
      <View
        style={[
          ChatInputStyle.inputContainer,
          { backgroundColor: theme.theme.colors.background }
        ]}
      >
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
            style={[
              ChatInputStyle.inputView,
              { backgroundColor: theme.theme.colors.surface }
            ]}
          >
            <TextInput
              ref={inputRef}
              autoCorrect={false}
              multiline
              onFocus={() => {
                setIsFocused(true);
                onFocus();
              }}
              placeholder="New message 💬"
              placeholderTextColor={COLORS.LIGHTGRAY_100}
              onBlur={() => setIsFocused(false)}
              value={message}
              onChangeText={onChangeText}
              selectionColor={COLORS.PURPLE}
              style={[ChatInputStyle.input, { color: theme.theme.colors.text }]}
            />
            <TouchableOpacity
              activeOpacity={0.5}
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
      </View>
    </View>
  );
};

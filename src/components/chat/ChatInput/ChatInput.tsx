import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { ReactionButtons } from '@components/chat/ReactionButtons/ReactionButtons';
import { ChatInputStyle } from '@components/chat/ChatInput/ChatInput.style';
import { ChatInputProps } from '@components/chat/ChatInput/ChatInput.props';
import COLORS from '@constants/COLORS';

export const ChatInput = ({
    message,
    onChangeText,
    onPressSend,
    onPressReaction,
    replyMessage,
    inputRef,
    onFocus,
    onDismissReply,
    showReactionsButtons
}: ChatInputProps): React.JSX.Element => (
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
        </View>
    </KeyboardAvoidingView>
);

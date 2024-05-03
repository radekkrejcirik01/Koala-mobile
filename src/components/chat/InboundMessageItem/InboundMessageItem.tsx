import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
    GestureHandlerRootView,
    Swipeable
} from 'react-native-gesture-handler';
import { InboundMessageItemProps } from '@components/chat/InboundMessageItem/InboundMessageItem.props';
import { InboundMessageItemStyle } from '@components/chat/InboundMessageItem/InboundMessageItem.style';
import { AudioMessageItem } from '@components/chat/AudioMessageItem/AudioMessageItem';
import { getMessageTime } from '@functions/getMessageTime';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';

export const InboundMessageItem = ({
    name,
    children,
    onLongPress,
    time,
    replyMessage,
    audioMessage,
    isLast
}: InboundMessageItemProps): React.JSX.Element => {
    function isEmojiOnly(str: string): boolean {
        const emojiRegex = /^(?:[\p{Emoji}\p{Mark}\p{Zs}\u{200D}])*$/u;

        return emojiRegex.test(str);
    }

    return (
        <GestureHandlerRootView
            style={[
                InboundMessageItemStyle.container,
                isLast && InboundMessageItemStyle.marginBottom
            ]}
        >
            {isLast ? (
                <ProfilePhoto
                    name={name}
                    size={32}
                    acronymStyle={InboundMessageItemStyle.acronym}
                    style={InboundMessageItemStyle.alignSelf}
                />
            ) : (
                <View style={InboundMessageItemStyle.emptyView} />
            )}
            <Swipeable
                renderLeftActions={() => (
                    <Text style={InboundMessageItemStyle.timeText}>
                        {getMessageTime(time)}
                    </Text>
                )}
                containerStyle={InboundMessageItemStyle.contentContainer}
                childrenContainerStyle={
                    InboundMessageItemStyle.childrenContainer
                }
            >
                {!!replyMessage && (
                    <View style={InboundMessageItemStyle.replyMessageView}>
                        <Text style={InboundMessageItemStyle.replyMessageText}>
                            {replyMessage}
                        </Text>
                    </View>
                )}
                {audioMessage ? (
                    <AudioMessageItem audioMessage={audioMessage} />
                ) : (
                    <TouchableOpacity
                        activeOpacity={1}
                        delayLongPress={150}
                        onLongPress={onLongPress}
                    >
                        <Text
                            style={[
                                InboundMessageItemStyle.messageText,
                                isEmojiOnly(children) &&
                                    InboundMessageItemStyle.largeText
                            ]}
                        >
                            {children}
                        </Text>
                    </TouchableOpacity>
                )}
            </Swipeable>
        </GestureHandlerRootView>
    );
};

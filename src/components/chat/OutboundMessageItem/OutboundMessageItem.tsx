import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
    GestureHandlerRootView,
    Swipeable
} from 'react-native-gesture-handler';
import { OutboundMessageItemProps } from '@components/chat/OutboundMessageItem/OutboundMessageItem.props';
import { OutboundMessageItemStyle } from '@components/chat/OutboundMessageItem/OutboundMessageItem.style';
import { getMessageTime } from '@functions/getMessageTime';
import COLORS from '@constants/COLORS';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';

export const OutboundMessageItem = ({
    children,
    onLongPress,
    time,
    replyMessage,
    audioMessage,
    onPlayAudioMessage
}: OutboundMessageItemProps): React.JSX.Element => {
    function isEmojiOnly(str: string): boolean {
        const emojiRegex = /^(?:[\p{Emoji}\p{Mark}\p{Zs}\u{200D}])*$/u;

        return emojiRegex.test(str);
    }

    return (
        <GestureHandlerRootView style={OutboundMessageItemStyle.container}>
            <Swipeable
                renderRightActions={() => (
                    <Text style={OutboundMessageItemStyle.timeText}>
                        {getMessageTime(time)}
                    </Text>
                )}
            >
                {!!replyMessage && (
                    <View style={OutboundMessageItemStyle.replyMessageView}>
                        <Text style={OutboundMessageItemStyle.replyMessageText}>
                            {replyMessage}
                        </Text>
                    </View>
                )}
                {!!audioMessage && (
                    <View
                        style={{
                            width: '60%',
                            height: 50,
                            marginBottom: 2,
                            paddingVertical: 8,
                            paddingHorizontal: 10,
                            borderRadius: 20,
                            borderWidth: 2,
                            borderColor: COLORS.LIGHTGRAY,
                            flexDirection: 'row',
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Text
                            style={{
                                color: COLORS.BLACK,
                                fontWeight: '600'
                            }}
                        >
                            🎤 Audio message
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            hitSlop={10}
                            onPress={onPlayAudioMessage}
                            style={{ marginRight: 5 }}
                        >
                            <Icon name={IconEnum.PLAY} size={26} />
                        </TouchableOpacity>
                    </View>
                )}
                <TouchableOpacity
                    activeOpacity={1}
                    delayLongPress={150}
                    onLongPress={onLongPress}
                >
                    <Text
                        style={[
                            OutboundMessageItemStyle.messageText,
                            isEmojiOnly(children) &&
                                OutboundMessageItemStyle.largeText
                        ]}
                    >
                        {children}
                    </Text>
                </TouchableOpacity>
            </Swipeable>
        </GestureHandlerRootView>
    );
};

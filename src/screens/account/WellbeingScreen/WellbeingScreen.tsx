import React, { JSX } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import { useMessagesActions } from '@hooks/useMessagesActions';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { Modal } from '@components/general/Modal/Modal';
import { WellbeingScreenStyle } from '@screens/account/WellbeingScreen/WellbeingScreen.style';
import { MessageItem } from '@components/home/MessageItem/MessageItem';
import { AddButton } from '@components/general/AddButton/AddButton';
import { EmotionScreenMessageType } from '@enums/EmotionScreenMessageType';

export const WellbeingScreen = (): JSX.Element => {
    const { top } = useSafeAreaInsets();

    const {
        messages,
        modalScreen,
        modalVisible,
        onPressMessage,
        onPressAddEmotion,
        onItemLongPress,
        hideModalAndKeyboard
    } = useMessagesActions(EmotionScreenMessageType.Wellbeing);

    return (
        <View style={[WellbeingScreenStyle.container, { top }]}>
            <ScreenHeader
                title="Wellbeing"
                rightComponent={<AddButton onPress={onPressAddEmotion} />}
            />
            <ScrollView contentContainerStyle={WellbeingScreenStyle.scrollView}>
                <View style={WellbeingScreenStyle.imageContainer}>
                    <FastImage
                        source={require('../../../assets/images/Wellbeing.png')}
                        style={WellbeingScreenStyle.image}
                    />
                </View>
                <Text style={WellbeingScreenStyle.description}>
                    {`There is not a problem you couldn't handle 💙`}
                </Text>
                <View style={WellbeingScreenStyle.line} />
                <View style={WellbeingScreenStyle.messagesContainer}>
                    {messages.map((value, index) => (
                        <MessageItem
                            key={value.id}
                            index={index}
                            item={value}
                            onPressMessage={() => onPressMessage(value)}
                            onItemLongPress={() => onItemLongPress(value)}
                        />
                    ))}
                </View>
            </ScrollView>
            <Modal
                isVisible={modalVisible}
                content={modalScreen}
                onClose={hideModalAndKeyboard}
                style={WellbeingScreenStyle.modal}
            />
        </View>
    );
};

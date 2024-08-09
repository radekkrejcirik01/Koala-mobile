import React, { JSX, useCallback, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import { useModal } from '@hooks/useModal';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { AnxietyAndPanicScreenStyle } from '@screens/account/AnxietyAndPanicScreen/AnxietyAndPanicScreen.style';
import { Modal } from '@components/general/Modal/Modal';
import { ShareModalScreen } from '@components/home/ShareModalScreen/ShareModalScreen';
import { FriendsModalScreen } from '@components/friends/FriendsModalScreen/FriendsModalScreen';
import { EmotionInterface } from '@interfaces/general.interface';
import { ANXIETY_AND_PANIC_MESSAGES } from '@screens/account/AnxietyAndPanicScreen/AnxietyAndPanicScreen.const';

export const AnxietyAndPanicScreen = (): JSX.Element => {
    const { top } = useSafeAreaInsets();
    const { modalVisible, showModal, hideModal } = useModal();

    const [modalContent, setModalContent] = useState<JSX.Element>(<></>);

    const onPressMessage = useCallback(
        (item: EmotionInterface) => {
            setModalContent(
                <ShareModalScreen
                    item={item}
                    onAddFriendPress={() => {
                        hideModal();
                        setModalContent(<FriendsModalScreen />);
                        setTimeout(() => {
                            showModal();
                        }, 100);
                    }}
                />
            );
            showModal();
        },
        [hideModal, showModal]
    );

    return (
        <View style={[AnxietyAndPanicScreenStyle.container, { top }]}>
            <ScreenHeader title="Anxiety & panic" />
            <ScrollView
                contentContainerStyle={AnxietyAndPanicScreenStyle.scrollView}
            >
                <FastImage
                    source={require('../../../assets/images/Anxiety.png')}
                    style={AnxietyAndPanicScreenStyle.image}
                />
                <View style={AnxietyAndPanicScreenStyle.messagesContainer}>
                    {ANXIETY_AND_PANIC_MESSAGES.map((value) => (
                        <TouchableOpacity
                            key={value.id}
                            activeOpacity={0.7}
                            onPress={() => onPressMessage(value)}
                            style={AnxietyAndPanicScreenStyle.buttonView}
                        >
                            <Text style={AnxietyAndPanicScreenStyle.buttonText}>
                                {value.message}
                            </Text>
                            <Text>💬</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <Modal
                isVisible={modalVisible}
                content={modalContent}
                onClose={hideModal}
                style={AnxietyAndPanicScreenStyle.modal}
            />
        </View>
    );
};

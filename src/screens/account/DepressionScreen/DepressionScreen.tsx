import React, { JSX, useCallback, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { useModal } from '@hooks/useModal';
import { EmotionInterface } from '@interfaces/general.interface';
import { ShareModalScreen } from '@components/home/ShareModalScreen/ShareModalScreen';
import { FriendsModalScreen } from '@components/friends/FriendsModalScreen/FriendsModalScreen';
import { Modal } from '@components/general/Modal/Modal';
import { DepressionScreenStyle } from '@screens/account/DepressionScreen/DepressionScreen.style';
import { DEPRESSION_MESSAGES } from '@screens/account/DepressionScreen/DepressionScreen.const';

export const DepressionScreen = (): JSX.Element => {
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
        <View style={[DepressionScreenStyle.container, { top }]}>
            <ScreenHeader title="Depression" />
            <ScrollView
                contentContainerStyle={DepressionScreenStyle.scrollView}
            >
                <FastImage
                    source={require('../../../assets/images/Depression.png')}
                    style={DepressionScreenStyle.image}
                />
                <View style={DepressionScreenStyle.messagesContainer}>
                    {DEPRESSION_MESSAGES.map((value) => (
                        <TouchableOpacity
                            key={value.id}
                            activeOpacity={0.7}
                            onPress={() => onPressMessage(value)}
                            style={DepressionScreenStyle.buttonView}
                        >
                            <Text style={DepressionScreenStyle.buttonText}>
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
                style={DepressionScreenStyle.modal}
            />
        </View>
    );
};

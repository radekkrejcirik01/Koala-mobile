import React, { JSX, useCallback, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import { useModal } from '@hooks/useModal';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { EmotionInterface } from '@interfaces/general.interface';
import { ShareModalScreen } from '@components/home/ShareModalScreen/ShareModalScreen';
import { FriendsModalScreen } from '@components/friends/FriendsModalScreen/FriendsModalScreen';
import { Modal } from '@components/general/Modal/Modal';
import { KudosScreenStyle } from '@screens/account/KudosScreen/KudosScreen.style';
import { KUDOS_MESSAGES } from '@screens/account/KudosScreen/KudosScreen.const';

export const KudosScreen = (): JSX.Element => {
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
        <View style={[KudosScreenStyle.container, { top }]}>
            <ScreenHeader title="Kudos" />
            <ScrollView contentContainerStyle={KudosScreenStyle.scrollView}>
                <FastImage
                    source={require('../../../assets/images/Kudos.png')}
                    style={KudosScreenStyle.image}
                />
                <View style={KudosScreenStyle.messagesContainer}>
                    {KUDOS_MESSAGES.map((value) => (
                        <TouchableOpacity
                            key={value.id}
                            activeOpacity={0.7}
                            onPress={() => onPressMessage(value)}
                            style={KudosScreenStyle.buttonView}
                        >
                            <Text style={KudosScreenStyle.buttonText}>
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
                style={KudosScreenStyle.modal}
            />
        </View>
    );
};

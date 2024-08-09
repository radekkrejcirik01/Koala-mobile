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
import { WellbeingScreenStyle } from '@screens/account/WellbeingScreen/WellbeingScreen.style';
import { WELLBEING_MESSAGES } from '@screens/account/WellbeingScreen/WellbeingScreen.const';

export const WellbeingScreen = (): JSX.Element => {
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
        <View style={[WellbeingScreenStyle.container, { top }]}>
            <ScreenHeader title="Wellbeing" />
            <ScrollView contentContainerStyle={WellbeingScreenStyle.scrollView}>
                <FastImage
                    source={require('../../../assets/images/Wellbeing.png')}
                    style={WellbeingScreenStyle.image}
                />
                <View style={WellbeingScreenStyle.messagesContainer}>
                    {WELLBEING_MESSAGES.map((value) => (
                        <TouchableOpacity
                            key={value.id}
                            activeOpacity={0.7}
                            onPress={() => onPressMessage(value)}
                            style={WellbeingScreenStyle.buttonView}
                        >
                            <Text style={WellbeingScreenStyle.buttonText}>
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
                style={WellbeingScreenStyle.modal}
            />
        </View>
    );
};

import React, { useCallback, useEffect, useState } from 'react';
import {
    Keyboard,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation as useDefaultNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useModal } from '@hooks/useModal';
import { useMessaging } from '@hooks/useMessaging';
import { useNotifications } from '@hooks/useNotifications';
import { HomeScreenStyle } from '@screens/account/HomeScreen/HomeScreen.style';
import { RecordItem } from '@screens/account/HomeScreen/HomeScreen.props';
import { Modal } from '@components/general/Modal/Modal';
import { ShareModalScreen } from '@components/home/ShareModalScreen/ShareModalScreen';
import { ReducerProps } from '@store/index/index.props';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { ProfileModalScreen } from '@components/home/ProfileModalScreen/ProfileModalScreen';
import { FriendsModalScreen } from '@components/home/FriendsModalScreen/FriendsModalScreen';
import { NotificationsHeader } from '@components/home/NotificationsHeader/NotificationsHeader';
import { DATA } from '@screens/account/HomeScreen/HomeScreen.const';

export const HomeScreen = (): JSX.Element => {
    const { name, profilePhoto } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    useMessaging();
    useNotifications();
    const navigation = useDefaultNavigation();
    const { bottom } = useSafeAreaInsets();
    const { modalVisible, showModal, hideModal } = useModal();
    const [modalContent, setModalContent] = useState<JSX.Element>(<></>);

    const openProfile = useCallback(() => {
        setModalContent(<ProfileModalScreen />);
        showModal();
    }, [showModal]);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity activeOpacity={0.9} onPress={openProfile}>
                    <ProfilePhoto
                        name={name}
                        photo={profilePhoto}
                        size={40}
                        style={HomeScreenStyle.marginLeft}
                    />
                </TouchableOpacity>
            ),
            headerRight: () => <NotificationsHeader />
        });
    }, [name, navigation, openProfile, profilePhoto]);

    const onItemPress = useCallback(
        (item: RecordItem) => {
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

    const onFriendsPress = () => {
        setModalContent(<FriendsModalScreen />);
        showModal();
    };

    return (
        <View style={HomeScreenStyle.container}>
            <ScrollView contentContainerStyle={HomeScreenStyle.scrollView}>
                <View style={HomeScreenStyle.contentView}>
                    {DATA.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            activeOpacity={0.9}
                            onPress={() => onItemPress(item)}
                            style={HomeScreenStyle.buttonView}
                        >
                            <Text style={HomeScreenStyle.buttonText}>
                                {item.emotion}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={onFriendsPress}
                style={[
                    HomeScreenStyle.friendsButtonView,
                    {
                        bottom: bottom || 10
                    }
                ]}
            >
                <Text style={HomeScreenStyle.friendsButtonText}>Friends</Text>
            </TouchableOpacity>
            <Modal
                isVisible={modalVisible}
                content={modalContent}
                onClose={() => {
                    hideModal();
                    Keyboard.dismiss();
                }}
                style={HomeScreenStyle.modal}
            />
        </View>
    );
};

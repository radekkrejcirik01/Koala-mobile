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
import { useNavigation } from '@hooks/useNavigation';
import { useMessaging } from '@hooks/useMessaging';
import { HomeScreenStyle } from '@screens/account/HomeScreen/HomeScreen.style';
import { RecordItem } from '@screens/account/HomeScreen/HomeScreen.props';
import { Modal } from '@components/general/Modal/Modal';
import { ShareModalScreen } from '@components/home/ShareModalScreen/ShareModalScreen';
import { ReducerProps } from '@store/index/index.props';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { ProfileModalScreen } from '@components/home/ProfileModalScreen/ProfileModalScreen';
import { FriendsModalScreen } from '@components/home/FriendsModalScreen/FriendsModalScreen';
import { NotificationsHeader } from '@components/home/NotificationsHeader/NotificationsHeader';

export const HomeScreen = (): JSX.Element => {
    const { name, profilePhoto } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    useMessaging();
    useNavigation();
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

    const data: RecordItem[] = [
        {
            id: 1,
            emotion: 'Anxiety attack',
            description: 'I have anxiety attack',
            tip1: 'Breathe',
            tip2: 'Go for a walk'
        },
        {
            id: 2,
            emotion: 'Panic attack',
            description: 'I have panic attack',
            tip1: 'Breathe',
            tip2: 'Go for a walk'
        },
        {
            id: 3,
            emotion: 'Not motivated',
            description: 'I am not motivated',
            tip1: 'Breathe',
            tip2: 'Go for a walk'
        },
        {
            id: 4,
            emotion: 'Hungry',
            description: 'I am hungry',
            tip1: 'Breathe',
            tip2: 'Go for a walk'
        },
        {
            id: 5,
            emotion: 'Tired',
            description: 'I am so tired',
            tip1: 'Breathe',
            tip2: 'Go for a walk'
        },
        {
            id: 6,
            emotion: 'Overwhelmed',
            description: 'I overwhelmed',
            tip1: 'Breathe',
            tip2: 'Go for a walk'
        },
        {
            id: 7,
            emotion: 'Exhausted',
            description: 'I am exhausted',
            tip1: 'Breathe',
            tip2: 'Go for a walk'
        },
        {
            id: 9,
            emotion: 'Frustrated',
            description: 'I am frustrated',
            tip1: 'Breathe',
            tip2: 'Go for a walk'
        },
        {
            id: 11,
            emotion: 'Want to cry',
            description: 'I want to cry',
            tip1: 'Breathe',
            tip2: 'Go for a walk'
        },
        {
            id: 12,
            emotion: 'Crying',
            description: 'I am crying',
            tip1: 'Breathe',
            tip2: 'Go for a walk'
        },
        {
            id: 14,
            emotion: 'Not eating today',
            description: 'I have problem eat today',
            tip1: 'Breathe',
            tip2: 'Go for a walk'
        },
        {
            id: 15,
            emotion: 'Existential crisis',
            description: 'I have existential crisis',
            tip1: 'Breathe',
            tip2: 'Go for a walk'
        },
        {
            id: 16,
            emotion: 'Cant sleep',
            description: 'I cant fucking sleep',
            tip1: 'Breathe',
            tip2: 'Go for a walk'
        },
        {
            id: 17,
            emotion: 'Today is ass',
            description: 'Today is ass, sucks, fucking terrible',
            tip1: 'Breathe',
            tip2: 'Go for a walk'
        },
        {
            id: 18,
            emotion: 'Wanna go home',
            description: 'I WANT TO GO HOME',
            tip1: 'Breathe',
            tip2: 'Go for a walk'
        }
    ];

    const onItemPress = useCallback(
        (item: RecordItem) => {
            setModalContent(<ShareModalScreen item={item} />);
            showModal();
        },
        [showModal]
    );

    const onFriendsPress = () => {
        setModalContent(<FriendsModalScreen />);
        showModal();
    };

    return (
        <View style={HomeScreenStyle.container}>
            <ScrollView contentContainerStyle={HomeScreenStyle.scrollView}>
                <View style={HomeScreenStyle.contentView}>
                    {data.map((item) => (
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
                        bottom
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

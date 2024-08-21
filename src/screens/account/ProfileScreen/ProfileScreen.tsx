import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@hooks/useNavigation';
import { ReducerProps } from '@store/index/index.props';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { ProfileScreenStyle } from '@screens/account/ProfileScreen/ProfileScreen.style';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { ProfileHeader } from '@components/profile/ProfileHeader/ProfileHeader';
import { ProfileItem } from '@components/profile/ProfileItem/ProfileItem';
import { version } from '../../../../package.json';

export const ProfileScreen = (): React.JSX.Element => {
    const { username, name } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const { top } = useSafeAreaInsets();
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    return (
        <ScrollView
            style={{ marginTop: top }}
            contentContainerStyle={ProfileScreenStyle.contentContainerStyle}
        >
            <View>
                <ProfileHeader />
                <View style={ProfileScreenStyle.container}>
                    <ProfilePhoto name={name} size={75} />
                    <View style={ProfileScreenStyle.namesView}>
                        <Text style={ProfileScreenStyle.name}>{name}</Text>
                        <Text style={ProfileScreenStyle.username}>
                            {username}
                        </Text>
                    </View>
                </View>
                <View style={ProfileScreenStyle.buttonsContainer}>
                    <ProfileItem
                        onPress={() =>
                            navigateTo(AccountStackNavigatorEnum.AccountScreen)
                        }
                        icon="🌱"
                        title="Account"
                    />
                    <ProfileItem
                        onPress={() =>
                            navigateTo(
                                AccountStackNavigatorEnum.SharingHistoryScreen
                            )
                        }
                        icon="📱"
                        title="Sharing history"
                        isLast
                    />
                </View>
                <View style={ProfileScreenStyle.buttonsContainer}>
                    <ProfileItem
                        onPress={() =>
                            navigateTo(AccountStackNavigatorEnum.SupportScreen)
                        }
                        icon="🫂"
                        title="Support"
                    />
                    <ProfileItem
                        onPress={() =>
                            navigateTo(AccountStackNavigatorEnum.FeedbackScreen)
                        }
                        icon="🫶"
                        title="Feedback"
                        isLast
                    />
                </View>
            </View>
            <View>
                <Text style={ProfileScreenStyle.text}>Koala Messenger</Text>
                <Text style={ProfileScreenStyle.text}>{version}</Text>
            </View>
        </ScrollView>
    );
};

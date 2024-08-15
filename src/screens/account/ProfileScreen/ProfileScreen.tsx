import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@hooks/useNavigation';
import { ReducerProps } from '@store/index/index.props';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { ProfileScreenStyle } from '@screens/account/ProfileScreen/ProfileScreen.style';
import { Icon } from '@components/general/Icon/Icon';
import { IconEnum } from '@components/general/Icon/Icon.enum';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { ProfileHeader } from '@components/profile/ProfileHeader/ProfileHeader';
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
                        <Text style={ProfileScreenStyle.nameText}>{name}</Text>
                        <Text style={ProfileScreenStyle.usernameText}>
                            {username}
                        </Text>
                    </View>
                </View>
                <View style={ProfileScreenStyle.buttonsContainer}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() =>
                            navigateTo(AccountStackNavigatorEnum.AccountScreen)
                        }
                        style={ProfileScreenStyle.buttonView}
                    >
                        <Text style={ProfileScreenStyle.buttonText}>
                            Account
                        </Text>
                        <Icon
                            name={IconEnum.BACK}
                            size={18}
                            style={{ transform: [{ rotate: '180deg' }] }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() =>
                            navigateTo(
                                AccountStackNavigatorEnum.SharingHistoryScreen
                            )
                        }
                        style={ProfileScreenStyle.buttonView}
                    >
                        <Text style={ProfileScreenStyle.buttonText}>
                            Shared
                        </Text>
                        <Icon
                            name={IconEnum.BACK}
                            size={18}
                            style={{ transform: [{ rotate: '180deg' }] }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={ProfileScreenStyle.text}>Koala Messenger</Text>
                <Text style={ProfileScreenStyle.text}>{version}</Text>
            </View>
        </ScrollView>
    );
};

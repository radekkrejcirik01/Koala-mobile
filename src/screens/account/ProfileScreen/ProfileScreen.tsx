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
import { version } from '../../../../package.json';

export const ProfileScreen = (): React.JSX.Element => {
    const { username, name } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const { top } = useSafeAreaInsets();
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.AccountStack);

    return (
        <ScrollView
            style={{ paddingTop: top + 10 }}
            contentContainerStyle={ProfileScreenStyle.contentContainerStyle}
        >
            <View>
                <Text style={ProfileScreenStyle.titleText}>Profile</Text>
                <View style={ProfileScreenStyle.profileContainer}>
                    <ProfilePhoto name={name} size={60} />
                    <View style={ProfileScreenStyle.profileNamesView}>
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
                        <Icon name={IconEnum.BACK_BLUE_RIGHT} size={18} />
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
                            Sharing history
                        </Text>
                        <Icon name={IconEnum.BACK_BLUE_RIGHT} size={18} />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={ProfileScreenStyle.text}>Made to help</Text>
                <Text style={ProfileScreenStyle.text}>version {version}</Text>
            </View>
        </ScrollView>
    );
};

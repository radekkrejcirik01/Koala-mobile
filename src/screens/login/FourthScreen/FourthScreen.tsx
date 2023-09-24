import React, { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@hooks/useNavigation';
import { postRequest } from '@utils/Axios/Axios.service';
import { AuthResponseInterface } from '@interfaces/response/Response.interface';
import { UserPostInterface } from '@interfaces/post/Post.interface';
import { setUserToken } from '@store/UserReducer';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import { PreloadService } from '@utils/general/PreloadService';
import { ReducerProps } from '@store/index/index.props';
import { FourthScreenStyle } from '@screens/login/FourthScreen/FourthScreen.style';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { LoginStackNavigatorEnum } from '@navigation/StackNavigators/login/LoginStackNavigator.enum';
import COLORS from '@constants/COLORS';

export const FourthScreen = (): JSX.Element => {
    const { name, username } = useSelector(
        (state: ReducerProps) => state.newAccount
    );
    const dispatch = useDispatch();

    const { navigateTo } = useNavigation(RootStackNavigatorEnum.LoginStack);

    const [password, setPassword] = useState<string>();
    const [posting, setPosting] = useState<boolean>(false);

    const createAccount = useCallback(() => {
        if (!password) {
            Alert.alert('Please enter password');
            return;
        }

        setPosting(true);

        postRequest<AuthResponseInterface, UserPostInterface>('user', {
            name,
            username,
            password
        }).subscribe((response: AuthResponseInterface) => {
            setPosting(false);

            if (response?.status) {
                if (response?.message?.includes('exists')) {
                    Alert.alert('This username is already taken');
                } else {
                    dispatch(setUserToken(response?.token));

                    PersistStorage.setItem(
                        PersistStorageKeys.TOKEN,
                        response?.token
                    ).catch();

                    PreloadService.loadUserObject();
                }
            }
        });
    }, [dispatch, name, password, username]);

    const openPrivacyPolicy = useCallback(() => {
        navigateTo(LoginStackNavigatorEnum.PrivacyPolicyScreen);
    }, [navigateTo]);

    return (
        <View style={FourthScreenStyle.container}>
            <View>
                <Text style={FourthScreenStyle.title}>
                    Confirm with password
                </Text>
                <TextInput
                    autoFocus
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={setPassword}
                    style={FourthScreenStyle.input}
                />
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={openPrivacyPolicy}
                    style={FourthScreenStyle.margin5}
                >
                    <Text style={FourthScreenStyle.privacyPolicyText}>
                        By creating account you agree with our privacy policy
                    </Text>
                </TouchableOpacity>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'position' : 'height'}
                keyboardVerticalOffset={15}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={createAccount}
                    style={FourthScreenStyle.buttonView}
                >
                    {posting ? (
                        <ActivityIndicator color={COLORS.WHITE} />
                    ) : (
                        <Text style={FourthScreenStyle.buttonText}>
                            Finish account
                        </Text>
                    )}
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
};

import React, { JSX, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { useNavigation } from '@hooks/useNavigation';
import { LoginScreenStyle } from '@screens/login/LoginScreen/LoginScreen.style';
import COLORS from '@constants/COLORS';
import { postRequest } from '@utils/Axios/Axios.service';
import { AuthResponseInterface } from '@interfaces/response/Response.interface';
import { LoginPostInterface } from '@interfaces/post/Post.interface';
import { setUserToken } from '@store/UserReducer';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import { PreloadService } from '@utils/general/PreloadService';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { LoginStackNavigatorEnum } from '@navigation/StackNavigators/login/LoginStackNavigator.enum';

export const LoginScreen = (): JSX.Element => {
    const dispatch = useDispatch();
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.LoginStack);

    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [posting, setPosting] = useState<boolean>(false);

    const login = useCallback(() => {
        setPosting(true);

        postRequest<AuthResponseInterface, LoginPostInterface>('login', {
            username,
            password
        }).subscribe((response: AuthResponseInterface) => {
            setPosting(false);

            if (response?.status) {
                dispatch(setUserToken(response?.token));

                PersistStorage.setItem(
                    PersistStorageKeys.TOKEN,
                    response?.token
                ).catch();

                PreloadService.loadUserObject();
            } else {
                Alert.alert('Incorrect credentials');
            }
        });
    }, [dispatch, password, username]);

    const onPressForgotPassword = useCallback(() => {
        navigateTo(LoginStackNavigatorEnum.ForgotPasswordScreen);
    }, [navigateTo]);

    return (
        <View style={LoginScreenStyle.container}>
            <View>
                <TextInput
                    autoFocus
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={setUsername}
                    placeholder="Username"
                    style={LoginScreenStyle.input}
                />
                <TextInput
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry
                    style={LoginScreenStyle.input}
                />
            </View>
            <View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'position' : 'height'}
                    keyboardVerticalOffset={15}
                >
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={login}
                        style={LoginScreenStyle.buttonView}
                    >
                        {posting ? (
                            <ActivityIndicator color={COLORS.WHITE} />
                        ) : (
                            <Text style={LoginScreenStyle.buttonText}>
                                Login
                            </Text>
                        )}
                    </TouchableOpacity>
                </KeyboardAvoidingView>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onPressForgotPassword}
                    style={LoginScreenStyle.forgotPasswordView}
                >
                    <Text style={LoginScreenStyle.forgotPasswordText}>
                        Forgot my password
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

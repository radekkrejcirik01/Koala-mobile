import React, { useCallback, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { postRequest } from '@utils/Axios/Axios.service';
import { AuthResponseInterface } from '@interfaces/response/Response.interface';
import { UserPostInterface } from '@interfaces/post/Post.interface';
import { setUserToken } from '@store/UserReducer';
import { PersistStorage } from '@utils/PersistStorage/PersistStorage';
import { PersistStorageKeys } from '@utils/PersistStorage/PersistStorage.enum';
import { PreloadService } from '@utils/general/PreloadService';
import { ReducerProps } from '@store/index/index.props';
import { FourthScreenStyle } from '@screens/login/FourthScreen/FourthScreen.style';

export const FourthScreen = (): JSX.Element => {
    const { name, username } = useSelector(
        (state: ReducerProps) => state.newAccount
    );
    const dispatch = useDispatch();

    const [password, setPassword] = useState<string>();

    const createAccount = useCallback(() => {
        if (!password) {
            Alert.alert('Please enter password');
            return;
        }

        postRequest<AuthResponseInterface, UserPostInterface>('user', {
            name,
            username,
            password
        }).subscribe((response: AuthResponseInterface) => {
            if (response?.status) {
                if (response?.message?.includes('exists')) {
                    Alert.alert('User with this username already exists');
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
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'position' : 'height'}
                keyboardVerticalOffset={15}
            >
                <TouchableOpacity
                    onPress={createAccount}
                    style={FourthScreenStyle.buttonView}
                >
                    <Text style={FourthScreenStyle.buttonText}>
                        Finish account
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
};

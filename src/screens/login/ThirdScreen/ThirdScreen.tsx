import React, { useCallback, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { LoginStackNavigatorEnum } from '@navigation/StackNavigators/login/LoginStackNavigator.enum';
import { setUsernameAction } from '@store/NewAccountReducer';
import { ThirdScreenStyle } from '@screens/login/ThirdScreen/ThirdScreen.style';
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';

export const ThirdScreen = (): JSX.Element => {
    const dispatch = useDispatch();
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.LoginStack);

    const [username, setUsername] = useState<string>();

    const onPressNext = useCallback(() => {
        if (!username) {
            Alert.alert('Please enter username');
            return;
        }

        dispatch(setUsernameAction(username));

        navigateTo(LoginStackNavigatorEnum.FourthScreen);
    }, [dispatch, navigateTo, username]);

    return (
        <View style={ThirdScreenStyle.container}>
            <Text style={ThirdScreenStyle.title}>Choose username</Text>
            <TextInput
                autoFocus
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={setUsername}
                style={ThirdScreenStyle.input}
            />
            <KeyboardAvoidingView>
                <TouchableOpacity
                    onPress={onPressNext}
                    style={ThirdScreenStyle.buttonView}
                >
                    <Text style={ThirdScreenStyle.buttonText}>Next</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
};

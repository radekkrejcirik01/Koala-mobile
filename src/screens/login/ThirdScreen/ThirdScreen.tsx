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
import { useDispatch } from 'react-redux';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { LoginStackNavigatorEnum } from '@navigation/StackNavigators/login/LoginStackNavigator.enum';
import { setUsernameAction } from '@store/NewAccountReducer';
import { ThirdScreenStyle } from '@screens/login/ThirdScreen/ThirdScreen.style';

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
            <View>
                <Text style={ThirdScreenStyle.title}>Your username</Text>
                <TextInput
                    autoFocus
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={setUsername}
                    style={ThirdScreenStyle.input}
                />
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'position' : 'height'}
                keyboardVerticalOffset={15}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={onPressNext}
                    style={ThirdScreenStyle.buttonView}
                >
                    <Text style={ThirdScreenStyle.buttonText}>Next</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
};

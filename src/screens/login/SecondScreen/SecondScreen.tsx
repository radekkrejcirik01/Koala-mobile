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
import { setNameAction } from '@store/NewAccountReducer';
import { SecondScreenStyle } from '@screens/login/SecondScreen/SecondScreen.style';

export const SecondScreen = (): JSX.Element => {
    const dispatch = useDispatch();
    const { navigateTo } = useNavigation(RootStackNavigatorEnum.LoginStack);

    const [name, setName] = useState<string>();

    const onPressNext = useCallback(() => {
        if (!name) {
            Alert.alert('Please enter name');
            return;
        }

        dispatch(setNameAction(name));

        navigateTo(LoginStackNavigatorEnum.ThirdScreen);
    }, [dispatch, name, navigateTo]);

    return (
        <View style={SecondScreenStyle.container}>
            <View>
                <Text style={SecondScreenStyle.title}>
                    Lets start with your name
                </Text>
                <TextInput
                    autoFocus
                    autoCorrect={false}
                    onChangeText={setName}
                    style={SecondScreenStyle.input}
                />
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'position' : 'height'}
                keyboardVerticalOffset={15}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={onPressNext}
                    style={SecondScreenStyle.buttonView}
                >
                    <Text style={SecondScreenStyle.buttonText}>Next</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
};

import React, { useCallback, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';
import { LoginStackNavigatorEnum } from '@navigation/StackNavigators/login/LoginStackNavigator.enum';
import { setNameAction } from '@store/NewAccountReducer';
import { SecondScreenStyle } from '@screens/login/SecondScreen/SecondScreen.style';
import { KeyboardAvoidingView } from '@components/general/KeyboardAvoidingView/KeyboardAvoidingView';

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
            <Text style={SecondScreenStyle.title}>
                Lets start with your name
            </Text>
            <TextInput
                autoFocus
                autoCorrect={false}
                onChangeText={setName}
                style={SecondScreenStyle.input}
            />
            <KeyboardAvoidingView>
                <TouchableOpacity
                    onPress={onPressNext}
                    style={SecondScreenStyle.buttonView}
                >
                    <Text style={SecondScreenStyle.buttonText}>Next</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
};

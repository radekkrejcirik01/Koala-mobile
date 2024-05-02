import React, { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { ForgotPasswordScreenStyle } from '@screens/login/ForgotPasswordScreen/ForgotPasswordScreen.style';
import { postRequest } from '@utils/Axios/Axios.service';
import { PasswordResetPostInterface } from '@interfaces/post/Post.interface';
import COLORS from '@constants/COLORS';

export const ForgotPasswordScreen = (): React.JSX.Element => {
    const [username, setUsername] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [friends, setFriends] = useState<string>();

    const [posting, setPosting] = useState<boolean>();

    const send = useCallback(() => {
        if (!username || !email || !friends) {
            Alert.alert('Please enter all information');
            return;
        }

        setPosting(true);

        postRequest<Response, PasswordResetPostInterface>('password-reset', {
            username,
            email,
            friends
        }).subscribe((response: Response) => {
            setPosting(false);

            if (response?.status) {
                Alert.alert(
                    'Success ✅ You will receive new password within 24 hours'
                );
                setUsername('');
                setEmail('');
                setFriends('');
            }
        });
    }, [email, friends, username]);

    return (
        <ScrollView style={ForgotPasswordScreenStyle.container}>
            <Text style={ForgotPasswordScreenStyle.inputTitleText}>
                Username
            </Text>
            <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
                style={ForgotPasswordScreenStyle.input}
            />
            <Text style={ForgotPasswordScreenStyle.inputTitleText}>Email</Text>
            <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                style={ForgotPasswordScreenStyle.input}
            />
            <Text style={ForgotPasswordScreenStyle.inputTitleText}>
                Safety confirmation:{'\n'}Type names of all your friends this
                account had.
            </Text>
            <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                value={friends}
                onChangeText={setFriends}
                multiline
                style={ForgotPasswordScreenStyle.textArea}
            />
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={send}
                style={ForgotPasswordScreenStyle.buttonView}
            >
                {posting ? (
                    <ActivityIndicator color={COLORS.WHITE} />
                ) : (
                    <Text style={ForgotPasswordScreenStyle.buttonText}>
                        Reset
                    </Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
};

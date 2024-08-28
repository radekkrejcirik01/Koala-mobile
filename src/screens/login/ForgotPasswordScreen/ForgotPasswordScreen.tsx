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
import { ResponseInterface } from '@interfaces/response/Response.interface';

export const ForgotPasswordScreen = (): React.JSX.Element => {
    const [username, setUsername] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [friendUsername, setFriendUsername] = useState<string>();

    const [posting, setPosting] = useState<boolean>();

    const send = useCallback(() => {
        if (!username || !email || !friendUsername) {
            Alert.alert('Please enter all information');
            return;
        }

        setPosting(true);

        postRequest<ResponseInterface, PasswordResetPostInterface>(
            'password-reset',
            {
                username,
                email,
                friendUsername
            }
        ).subscribe((response: ResponseInterface) => {
            setPosting(false);

            if (response?.status) {
                if (response?.message?.includes('incorrect')) {
                    Alert.alert('Incorrect usernames');
                    return;
                }

                Alert.alert('Success ✅', 'Check your email');
                setUsername('');
                setEmail('');
                setFriendUsername('');
            }
        });
    }, [email, friendUsername, username]);

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
                keyboardType="email-address"
                onChangeText={setEmail}
                style={ForgotPasswordScreenStyle.input}
            />
            <Text style={ForgotPasswordScreenStyle.inputTitleText}>
                Safety confirmation{'\n'}Type username of one of your friends
            </Text>
            <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                value={friendUsername}
                onChangeText={setFriendUsername}
                style={ForgotPasswordScreenStyle.input}
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

import React, { JSX, useCallback, useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSending } from '@hooks/useSending';
import { SupportScreenStyle } from '@screens/account/SupportScreen/SupportScreen.style';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import COLORS from '@constants/COLORS';
import { SendButton } from '@components/home/SendButton/SendButton';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { SupportPostInterface } from '@interfaces/post/Post.interface';

export const SupportScreen = (): JSX.Element => {
    const { top } = useSafeAreaInsets();
    const { sending, setSending, sent, setSent } = useSending();

    const [message, setMessage] = useState<string>();
    const [email, setEmail] = useState<string>();

    const send = useCallback(() => {
        if (!message) {
            Alert.alert('Please write a message first');
            return;
        }
        if (!email) {
            Alert.alert('Please write your email');
            return;
        }

        setSending(true);

        postRequest<ResponseInterface, SupportPostInterface>('support', {
            message,
            email
        }).subscribe((response: ResponseInterface) => {
            if (response?.status === 'success') {
                setSending(false);
                setSent(true);

                setMessage('');
                setEmail('');
            }
        });
    }, [email, message, setSending, setSent]);

    return (
        <View style={[SupportScreenStyle.container, { top }]}>
            <ScreenHeader title="Support" />
            <Text style={SupportScreenStyle.title}>
                Share with us your problem and we will get to you
            </Text>
            <TextInput
                placeholder="Message..."
                value={message}
                onChangeText={setMessage}
                multiline
                selectionColor={COLORS.BUTTON_BLUE}
                style={SupportScreenStyle.input}
            />
            <TextInput
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                selectionColor={COLORS.BUTTON_BLUE}
                style={SupportScreenStyle.emailInput}
            />
            <View style={SupportScreenStyle.button}>
                <SendButton onPress={send} sending={sending} sent={sent} />
                {sent && (
                    <Text style={SupportScreenStyle.thankText}>
                        We got your message.
                    </Text>
                )}
            </View>
        </View>
    );
};

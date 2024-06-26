import React, { JSX, useCallback, useState } from 'react';
import {
    ActivityIndicator,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AddEmotionModalScreenStyle } from '@components/home/AddEmotionModalScreen/AddEmotionModalScreen.style';
import { AddEmotionModalScreenProps } from '@components/home/AddEmotionModalScreen/AddEmotionModalScreen.props';
import { postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { EmotionPostInterface } from '@interfaces/post/Post.interface';
import COLORS from '@constants/COLORS';

export const AddEmotionModalScreen = ({
    onAdded
}: AddEmotionModalScreenProps): JSX.Element => {
    const { top } = useSafeAreaInsets();

    const [emotion, setEmotion] = useState<string>();
    const [emotionMessage, setEmotionMessage] = useState<string>();
    const [tip1, setTip1] = useState<string>();
    const [tip2, setTip2] = useState<string>();
    const [posting, setPosting] = useState<boolean>(false);

    const add = useCallback(async () => {
        if (!emotion || !emotionMessage) {
            onAdded();
            return;
        }

        setPosting(true);

        postRequest<ResponseInterface, EmotionPostInterface>('emotion', {
            emotion,
            message: emotionMessage,
            tip1,
            tip2
        }).subscribe((response: ResponseInterface) => {
            setPosting(false);

            if (response?.status) {
                onAdded();
            }
        });
    }, [emotion, emotionMessage, onAdded, tip1, tip2]);

    return (
        <View
            style={[
                AddEmotionModalScreenStyle.container,
                { paddingTop: top + 10 }
            ]}
        >
            <Text style={AddEmotionModalScreenStyle.titleText}>
                Add message
            </Text>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={add}
                style={AddEmotionModalScreenStyle.addView}
            >
                {posting ? (
                    <ActivityIndicator color={COLORS.WHITE} />
                ) : (
                    <Text style={AddEmotionModalScreenStyle.addText}>Done</Text>
                )}
            </TouchableOpacity>
            <Text style={AddEmotionModalScreenStyle.inputTitleText}>Name</Text>
            <TextInput
                autoFocus
                autoCorrect={false}
                selectionColor={COLORS.PURPLE}
                onChangeText={setEmotion}
                placeholder="Overthinking"
                style={AddEmotionModalScreenStyle.input}
            />
            <Text style={AddEmotionModalScreenStyle.inputTitleText}>
                Message to send
            </Text>
            <TextInput
                autoCorrect={false}
                selectionColor={COLORS.PURPLE}
                onChangeText={setEmotionMessage}
                placeholder="I CANT STOP OVERTHINKING"
                style={AddEmotionModalScreenStyle.input}
            />
            <Text style={AddEmotionModalScreenStyle.inputTitleText}>
                Helps me
            </Text>
            <TextInput
                autoCorrect={false}
                selectionColor={COLORS.PURPLE}
                onChangeText={setTip1}
                placeholder="Put on headphones and be delulu"
                style={AddEmotionModalScreenStyle.input}
            />
            <TextInput
                autoCorrect={false}
                selectionColor={COLORS.PURPLE}
                onChangeText={setTip2}
                placeholder="Change environment"
                style={AddEmotionModalScreenStyle.input}
            />
        </View>
    );
};

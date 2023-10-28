import React, { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
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
            style={[AddEmotionModalScreenStyle.container, { marginTop: top }]}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={AddEmotionModalScreenStyle.listContainer}
            >
                <Text style={AddEmotionModalScreenStyle.emotionText}>
                    Emotion
                </Text>
                <TextInput
                    autoFocus
                    autoCorrect={false}
                    onChangeText={setEmotion}
                    style={AddEmotionModalScreenStyle.emotionInput}
                />
                <Text style={AddEmotionModalScreenStyle.messageText}>
                    Message
                </Text>
                <TextInput
                    autoCorrect={false}
                    onChangeText={setEmotionMessage}
                    style={AddEmotionModalScreenStyle.messageInput}
                    multiline
                />
                <Text style={AddEmotionModalScreenStyle.tipText}>Can help</Text>
                <TextInput
                    autoCorrect={false}
                    onChangeText={setTip1}
                    style={AddEmotionModalScreenStyle.tipInput}
                    multiline
                />
                <Text style={AddEmotionModalScreenStyle.tipText}>Can help</Text>
                <TextInput
                    autoCorrect={false}
                    onChangeText={setTip2}
                    style={AddEmotionModalScreenStyle.tipInput}
                    multiline
                />
            </ScrollView>
            <View style={AddEmotionModalScreenStyle.addContainer}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    disabled={!emotion || !emotionMessage}
                    onPress={add}
                    style={AddEmotionModalScreenStyle.addView}
                >
                    {posting ? (
                        <ActivityIndicator color={COLORS.WHITE} />
                    ) : (
                        <Text style={AddEmotionModalScreenStyle.addText}>
                            Add
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

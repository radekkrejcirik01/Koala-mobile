import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSelector } from 'react-redux';
import { usePrompt } from '@hooks/usePrompt';
import {
    ReactionButtonInterface,
    ReactionButtonsProps
} from '@components/chat/ReactionButtons/ReactionButtons.props';
import { ReactionButtonsStyle } from '@components/chat/ReactionButtons/ReactionButtons.style';
import {
    deleteRequest,
    getRequest,
    postRequest
} from '@utils/Axios/Axios.service';
import {
    ResponseInterface,
    ResponseRepliesGetInterface
} from '@interfaces/response/Response.interface';
import { ReplyPostInterface } from '@interfaces/post/Post.interface';
import { ReducerProps } from '@store/index/index.props';
import { REPLIES } from '@components/chat/ReactionButtons/ReactionButtons.const';
import COLORS from '@constants/COLORS';
import { Prompt } from '@components/general/Prompt/Prompt';

export const ReactionButtons = ({ onPressReaction }: ReactionButtonsProps) => {
    const { id: userId } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const { promptVisible, showPrompt, hidePrompt } = usePrompt();

    const [replies, setReplies] = useState<ReactionButtonInterface[]>([]);
    const [loaded, setLoad] = useState<boolean>(false);

    const getReplies = useCallback(() => {
        getRequest<ResponseRepliesGetInterface>(`replies/${userId}`).subscribe(
            (response: ResponseRepliesGetInterface) => {
                setLoad(true);

                if (response?.status && !!response?.data?.length) {
                    setReplies([...REPLIES, ...response?.data]);
                } else {
                    setReplies(REPLIES);
                }
            }
        );
    }, [userId]);

    useEffect(() => {
        getReplies();
    }, [getReplies]);

    const add = useCallback(
        (value: string) => {
            postRequest<ResponseInterface, ReplyPostInterface>('reply', {
                message: value
            }).subscribe((response) => {
                if (response?.status) {
                    getReplies();
                }
            });
        },
        [getReplies]
    );

    const remove = useCallback(
        (item: ReactionButtonInterface) => {
            if (item.id <= 6) {
                return;
            }

            Alert.alert(item.message, '', [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Remove reply',
                    onPress: () => {
                        deleteRequest<ResponseInterface>(
                            `reply/${item.id}`
                        ).subscribe((response: ResponseInterface) => {
                            if (response?.status) {
                                getReplies();
                            }
                        });
                    },
                    style: 'destructive'
                }
            ]);
        },
        [getReplies]
    );

    if (!loaded) {
        return (
            <ActivityIndicator
                color={COLORS.BUTTON_BLUE}
                style={ReactionButtonsStyle.activityIndicator}
            />
        );
    }

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            style={ReactionButtonsStyle.scrollView}
            contentContainerStyle={ReactionButtonsStyle.container}
        >
            {replies?.map((value, index) => (
                <TouchableOpacity
                    key={value.id + index.toString()}
                    activeOpacity={0.9}
                    delayLongPress={150}
                    onPress={() => onPressReaction(value.message)}
                    onLongPress={() => remove(value)}
                    style={ReactionButtonsStyle.buttonView}
                >
                    <Text style={ReactionButtonsStyle.buttonText}>
                        {value.message}
                    </Text>
                </TouchableOpacity>
            ))}
            <View style={ReactionButtonsStyle.addView}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={showPrompt}
                    hitSlop={10}
                >
                    <Text style={ReactionButtonsStyle.addText}>Add +</Text>
                </TouchableOpacity>
            </View>
            <Prompt
                title="Add reply"
                isVisible={promptVisible}
                onPressOk={add}
                onClose={hidePrompt}
            />
        </ScrollView>
    );
};

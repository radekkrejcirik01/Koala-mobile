import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    ExpressionInterface,
    StatusModalScreenProps
} from '@components/home/StatusModalScreen/StatusModalScreen.props';
import { StatusModalScreenStyle } from '@components/home/StatusModalScreen/StatusModalScreen.style';
import { deleteRequest, postRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { ExpressionPostInterface } from '@interfaces/post/Post.interface';
import { ReducerProps } from '@store/index/index.props';

export const StatusModalScreen = ({
    onPostPress
}: StatusModalScreenProps): React.JSX.Element => {
    const { id: userId } = useSelector(
        (state: ReducerProps) => state.user.user
    );

    const { bottom } = useSafeAreaInsets();

    const expressions: ExpressionInterface[] = [
        {
            id: 1,
            expression: '😴'
        },
        {
            id: 2,
            expression: '😡'
        },
        {
            id: 3,
            expression: '😩'
        },
        {
            id: 4,
            expression: '😔'
        },
        {
            id: 5,
            expression: '😥'
        },
        {
            id: 6,
            expression: '😭'
        },
        {
            id: 7,
            expression: '💀'
        },
        {
            id: 8,
            expression: '😕'
        },
        {
            id: 9,
            expression: '🤕'
        }
    ];

    const post = useCallback(
        (expression: string) => {
            postRequest<ResponseInterface, ExpressionPostInterface>(
                'expression',
                {
                    userId,
                    expression
                }
            ).subscribe();

            onPostPress();
        },
        [onPostPress, userId]
    );

    const cleatStatus = useCallback(() => {
        deleteRequest<ResponseInterface>('expression').subscribe(
            (response: ResponseInterface) => {
                if (response?.status) {
                    onPostPress();
                }
            }
        );
    }, [onPostPress]);

    return (
        <View
            style={[
                StatusModalScreenStyle.container,
                {
                    paddingBottom: bottom + 20
                }
            ]}
        >
            <Text style={StatusModalScreenStyle.titleText}>
                No words, just expression
            </Text>
            <Text style={StatusModalScreenStyle.descriptionText}>
                Friends will receive silent notification and can reply directly
            </Text>
            <View style={StatusModalScreenStyle.expressionsContainer}>
                {expressions?.map((value) => (
                    <TouchableOpacity
                        key={value.id + value.expression}
                        activeOpacity={0.7}
                        onPress={() => post(value.expression)}
                        style={StatusModalScreenStyle.expressionButtonView}
                    >
                        <Text
                            style={StatusModalScreenStyle.expressionButtonText}
                        >
                            {value.expression}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity
                activeOpacity={0.7}
                hitSlop={10}
                onPress={cleatStatus}
                style={StatusModalScreenStyle.clearStatusButtonView}
            >
                <Text style={StatusModalScreenStyle.clearStatusButtonText}>
                    Clear status
                </Text>
            </TouchableOpacity>
        </View>
    );
};

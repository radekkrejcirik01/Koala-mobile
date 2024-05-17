import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusModalScreenProps } from '@components/home/StatusModalScreen/StatusModalScreen.props';
import { StatusModalScreenStyle } from '@components/home/StatusModalScreen/StatusModalScreen.style';
import { EXPRESSIONS } from '@components/home/StatusModalScreen/StatusModalScreen.const';

export const StatusModalScreen = ({
    onPressExpression,
    onPressClearStatus
}: StatusModalScreenProps): React.JSX.Element => {
    const { bottom } = useSafeAreaInsets();

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
                Your mood status
            </Text>
            <Text style={StatusModalScreenStyle.descriptionText}>
                Friends will receive silent notification and can reply
            </Text>
            <View style={StatusModalScreenStyle.expressionsContainer}>
                {EXPRESSIONS.map((value) => (
                    <TouchableOpacity
                        key={value.id + value.expression}
                        activeOpacity={0.7}
                        onPress={() => onPressExpression(value.expression)}
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
                onPress={onPressClearStatus}
                style={StatusModalScreenStyle.clearStatusButtonView}
            >
                <Text style={StatusModalScreenStyle.clearStatusButtonText}>
                    Clear status
                </Text>
            </TouchableOpacity>
        </View>
    );
};

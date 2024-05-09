import React, { JSX } from 'react';
import { Platform } from 'react-native';
import { AndroidPrompt } from '@components/general/AndroidPrompt/AndroidPrompt';
import { IOSPrompt } from '@components/general/IOSPrompt/IOSPrompt';
import { PromptProps } from '@components/general/Prompt/Prompt.props';

export const Prompt = ({
    isVisible,
    title,
    onPressOk,
    onClose
}: PromptProps): JSX.Element => {
    if (!isVisible) {
        return null;
    }

    return Platform.OS === 'ios' ? (
        <IOSPrompt title={title} onPressOK={onPressOk} onClose={onClose} />
    ) : (
        <AndroidPrompt title={title} onPressOK={onPressOk} onClose={onClose} />
    );
};

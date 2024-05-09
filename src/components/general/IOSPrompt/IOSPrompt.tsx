import React, { JSX, useEffect } from 'react';
import { Alert } from 'react-native';
import { IOSPromptProps } from '@components/general/IOSPrompt/IOSPrompt.props';

export const IOSPrompt = ({
    title,
    onPressOK,
    onClose
}: IOSPromptProps): JSX.Element => {
    useEffect(() => {
        Alert.prompt(
            title,
            '',
            [
                {
                    text: 'Cancel',
                    onPress: onClose,
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: (text: string) => {
                        if (text.length) {
                            onPressOK(text);
                        }
                        onClose();
                    }
                }
            ],
            undefined,
            ''
        );
    }, [onClose, onPressOK]);

    return <></>;
};

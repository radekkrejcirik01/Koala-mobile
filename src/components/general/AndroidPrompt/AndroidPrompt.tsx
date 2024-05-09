import React, { JSX, useCallback, useEffect, useState } from 'react';
import { Button, Keyboard, Text, TextInput, View } from 'react-native';
import { useModal } from '@hooks/useModal';
import { Modal } from '@components/general/Modal/Modal';
import { AndroidPromptContentProps } from '@components/general/AndroidPrompt/AndroidPrompt.props';
import { AndroidPromptStyle } from '@components/general/AndroidPrompt/AndroidPrompt.style';

export const AndroidPrompt = ({
    title,
    onPressOK,
    onClose
}: AndroidPromptContentProps): JSX.Element => {
    const { modalVisible, showModal, hideModal } = useModal();

    const [inputValue, setInputValue] = useState<string>();

    useEffect(() => {
        showModal();
    }, [showModal]);

    const hideModalAndKeyboard = useCallback(() => {
        Keyboard.dismiss();
        hideModal();
    }, [hideModal]);

    return (
        <Modal
            isVisible={modalVisible}
            content={
                <View style={AndroidPromptStyle.container}>
                    <Text style={AndroidPromptStyle.titleText}>{title}</Text>
                    <TextInput
                        autoFocus
                        value={inputValue}
                        onChangeText={setInputValue}
                        style={AndroidPromptStyle.input}
                    />
                    <View style={AndroidPromptStyle.buttonsView}>
                        <Button title="Cancel" onPress={hideModalAndKeyboard} />
                        <Button
                            title="OK"
                            onPress={() => {
                                if (inputValue?.length) {
                                    onPressOK(inputValue);
                                }
                                hideModalAndKeyboard();
                            }}
                        />
                    </View>
                </View>
            }
            onClose={hideModalAndKeyboard}
            onModalHide={onClose}
            style={AndroidPromptStyle.modal}
        />
    );
};

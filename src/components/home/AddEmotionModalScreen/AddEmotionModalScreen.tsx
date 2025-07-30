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
import { EmotionScreenMessageType } from '@enums/EmotionScreenMessageType';
import { useTheme } from '@contexts/ThemeContext';

export const AddEmotionModalScreen = ({
  onAdded,
  type
}: AddEmotionModalScreenProps): JSX.Element => {
  const { top } = useSafeAreaInsets();
  const theme = useTheme();

  const [message, setMessage] = useState<string>();
  const [tip1, setTip1] = useState<string>();
  const [tip2, setTip2] = useState<string>();
  const [posting, setPosting] = useState<boolean>(false);

  const add = useCallback(async () => {
    if (!message) {
      onAdded();
      return;
    }

    setPosting(true);

    postRequest<ResponseInterface, EmotionPostInterface>('emotion', {
      message,
      tip1,
      tip2,
      type
    }).subscribe((response: ResponseInterface) => {
      setPosting(false);

      if (response?.status) {
        onAdded();
      }
    });
  }, [message, onAdded, tip1, tip2, type]);

  return (
    <View
      style={[
        AddEmotionModalScreenStyle.container,
        { backgroundColor: theme.theme.colors.background, paddingTop: top + 10 }
      ]}
    >
      <Text style={AddEmotionModalScreenStyle.titleText}>Add your own</Text>
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
      <Text
        style={[
          AddEmotionModalScreenStyle.inputTitleText,
          { color: theme.theme.colors.text }
        ]}
      >
        Message
      </Text>
      <TextInput
        autoFocus
        autoCorrect={false}
        selectionColor={COLORS.PURPLE}
        onChangeText={setMessage}
        style={[
          AddEmotionModalScreenStyle.input,
          {
            color: theme.theme.colors.text,
            backgroundColor: theme.theme.colors.surface
          }
        ]}
      />
      {type !== EmotionScreenMessageType.Kudos && (
        <>
          <Text
            style={[
              AddEmotionModalScreenStyle.inputTitleText,
              { color: theme.theme.colors.text }
            ]}
          >
            Helps me
          </Text>
          <TextInput
            autoCorrect={false}
            selectionColor={COLORS.PURPLE}
            onChangeText={setTip1}
            placeholder="Put on headphones and be delulu"
            placeholderTextColor={COLORS.GRAY_200}
            style={[
              AddEmotionModalScreenStyle.input,
              {
                color: theme.theme.colors.text,
                backgroundColor: theme.theme.colors.surface
              }
            ]}
          />
          <TextInput
            autoCorrect={false}
            selectionColor={COLORS.PURPLE}
            onChangeText={setTip2}
            placeholder="Positive thinking"
            placeholderTextColor={COLORS.GRAY_200}
            style={[
              AddEmotionModalScreenStyle.input,
              {
                color: theme.theme.colors.text,
                backgroundColor: theme.theme.colors.surface
              }
            ]}
          />
        </>
      )}
    </View>
  );
};

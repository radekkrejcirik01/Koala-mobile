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
  RepliesProps,
  ReplyInterface
} from '@components/chat/Replies/Replies.props';
import { RepliesStyle } from '@components/chat/Replies/Replies.style';
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
import { REPLIES } from '@components/chat/Replies/Replies.const';
import COLORS from '@constants/COLORS';
import { Prompt } from '@components/general/Prompt/Prompt';
import { useTheme } from '../../../ThemeContext';

export const Replies = ({ onPressReply }: RepliesProps) => {
  const { id: userId } = useSelector((state: ReducerProps) => state.user.user);

  const { promptVisible, showPrompt, hidePrompt } = usePrompt();
  const theme = useTheme();

  const [replies, setReplies] = useState<ReplyInterface[]>([]);
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
    (item: ReplyInterface) => {
      // Allow removing only custom replies
      if (item?.isDefault) {
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
            deleteRequest<ResponseInterface>(`reply/${item.id}`).subscribe(
              (response: ResponseInterface) => {
                if (response?.status) {
                  getReplies();
                }
              }
            );
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
        style={RepliesStyle.activityIndicator}
      />
    );
  }

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={{ backgroundColor: theme.isDark ? COLORS.BLACK : COLORS.WHITE }}
      contentContainerStyle={RepliesStyle.container}
    >
      {replies?.map((value, index) => (
        <TouchableOpacity
          key={value.id + index.toString()}
          activeOpacity={0.9}
          delayLongPress={150}
          onPress={() => onPressReply(value.message)}
          onLongPress={() => remove(value)}
          style={[
            RepliesStyle.buttonView,
            { backgroundColor: theme.theme.colors.surface }
          ]}
        >
          <Text
            style={[
              RepliesStyle.buttonText,
              { color: theme.theme.colors.text }
            ]}
          >
            {value.message}
          </Text>
        </TouchableOpacity>
      ))}
      <View style={RepliesStyle.addView}>
        <TouchableOpacity activeOpacity={0.5} onPress={showPrompt} hitSlop={10}>
          <Text style={RepliesStyle.addText}>Add +</Text>
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

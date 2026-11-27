import React, { JSX, useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import moment from 'moment';
import { useTheme } from '@hooks/useTheme';
import { useJumpToMessage } from '@hooks/useJumpToMessage';
import { getRequest } from '@utils/Axios/Axios.service';
import { ResponseMessagesGetInterface } from '@interfaces/response/Response.interface';
import { MessageInterface } from '@interfaces/general.interface';
import { ReducerProps } from '@store/index/index.props';
import { MessageType } from '@enums/MessageType';
import { PAGE_SIZE } from '@constants/PAGE_SIZE';
import { getFriendName } from '@functions/getFriendName';
import { ChatSearchScreenProps } from '@screens/account/ChatSearchScreen/ChatSearchScreen.props';
import { useChatSearchScreenStyle } from '@screens/account/ChatSearchScreen/ChatSearchScreen.style';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';

// Waits for a pause in typing before searching
const SEARCH_DELAY = 300;

const getMessageText = (item: MessageInterface): string =>
  item.type === MessageType.Emotion
    ? [item.emotion, item.message].filter(Boolean).join(' ')
    : item.message;

// Splits the text around the matches of the query, ignoring case
const splitByMatch = (
  text: string,
  query: string
): { text: string; match: boolean; start: number }[] => {
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  let start = 0;
  return text
    .split(new RegExp(`(${escaped})`, 'gi'))
    .filter(Boolean)
    .map((part) => {
      const value = {
        text: part,
        match: part.toLowerCase() === query.toLowerCase(),
        start
      };
      start += part.length;
      return value;
    });
};

export const ChatSearchScreen = ({
  route
}: ChatSearchScreenProps): JSX.Element => {
  const ChatSearchScreenStyle = useChatSearchScreenStyle();
  const { friend } = route.params;

  const { id: userId } = useSelector((state: ReducerProps) => state.user.user);
  const { colors } = useTheme().theme;
  const { top, bottom } = useSafeAreaInsets();
  const { jumpTo, jumpingId } = useJumpToMessage(friend);

  const [query, setQuery] = useState<string>('');
  // The query the results are for, undefined before the first search
  const [searchedQuery, setSearchedQuery] = useState<string>();
  const [results, setResults] = useState<MessageInterface[]>([]);

  const hasMore = useRef<boolean>(false);
  const loadingMore = useRef<boolean>(false);
  // A slower response to an older query is ignored
  const latestQuery = useRef<string>('');

  const search = useCallback(
    (value: string, lastId?: number) => {
      const cursor = lastId ? `&lastId=${lastId}` : '';
      getRequest<ResponseMessagesGetInterface>(
        `chats/${friend.id}/messages/search?q=${encodeURIComponent(
          value
        )}${cursor}`
      ).subscribe((response: ResponseMessagesGetInterface) => {
        loadingMore.current = false;

        if (!response?.status || latestQuery.current !== value) {
          return;
        }

        const data = response.data ?? [];
        hasMore.current = data.length >= PAGE_SIZE;
        setResults((prevState) => (lastId ? prevState.concat(data) : data));
        setSearchedQuery(value);
      });
    },
    [friend.id]
  );

  useEffect(() => {
    const value = query.trim();
    latestQuery.current = value;

    if (!value) {
      setResults([]);
      setSearchedQuery(undefined);
      return undefined;
    }

    const timer = setTimeout(() => search(value), SEARCH_DELAY);
    return () => clearTimeout(timer);
  }, [query, search]);

  const loadMore = useCallback(() => {
    const last = results[results.length - 1];
    if (!hasMore.current || loadingMore.current || !last || !searchedQuery) {
      return;
    }

    loadingMore.current = true;
    search(searchedQuery, last.id);
  }, [results, search, searchedQuery]);

  const renderItem = ({ item }: { item: MessageInterface }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={jumpingId !== undefined}
      onPress={() => {
        Keyboard.dismiss();
        jumpTo(item.id);
      }}
      style={ChatSearchScreenStyle.resultView}
    >
      <View style={ChatSearchScreenStyle.resultContent}>
        <View style={ChatSearchScreenStyle.resultTopRow}>
          <Text
            style={[ChatSearchScreenStyle.senderText, { color: colors.text }]}
          >
            {item.senderId === userId ? 'You' : getFriendName(friend)}
          </Text>
          <Text style={ChatSearchScreenStyle.timeText}>
            {moment.unix(item.time).format('D. M. YYYY')}
          </Text>
        </View>
        <Text numberOfLines={2} style={ChatSearchScreenStyle.messageText}>
          {splitByMatch(getMessageText(item), searchedQuery ?? '').map(
            (part) => (
              <Text
                key={part.start}
                style={part.match && ChatSearchScreenStyle.matchText}
              >
                {part.text}
              </Text>
            )
          )}
        </Text>
      </View>
      {jumpingId === item.id && (
        <ActivityIndicator style={ChatSearchScreenStyle.loader} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[ChatSearchScreenStyle.container, { paddingTop: top }]}>
      <ScreenHeader title="Search" />
      <View
        style={[
          ChatSearchScreenStyle.inputView,
          { backgroundColor: colors.surface }
        ]}
      >
        <Text style={ChatSearchScreenStyle.inputIcon}>🔍</Text>
        <TextInput
          autoFocus
          autoCorrect={false}
          placeholder={`Search in chat with ${getFriendName(friend)}`}
          placeholderTextColor={colors.placeholder}
          selectionColor={colors.accent}
          returnKeyType="search"
          clearButtonMode="while-editing"
          value={query}
          onChangeText={setQuery}
          style={[ChatSearchScreenStyle.input, { color: colors.text }]}
        />
      </View>
      <FlatList
        data={results}
        extraData={jumpingId}
        keyExtractor={(item: MessageInterface) => String(item.id)}
        renderItem={renderItem}
        onEndReached={loadMore}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        ListEmptyComponent={
          searchedQuery ? (
            <Text style={ChatSearchScreenStyle.emptyText}>
              No messages found
            </Text>
          ) : null
        }
        contentContainerStyle={{ paddingBottom: bottom + 30 }}
      />
    </View>
  );
};

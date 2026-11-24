import React, { JSX, useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import moment from 'moment';
import { useJumpToMessage } from '@hooks/useJumpToMessage';
import { getRequest } from '@utils/Axios/Axios.service';
import { ResponseChatEmotionsGetInterface } from '@interfaces/response/Response.interface';
import { MessageInterface } from '@interfaces/general.interface';
import { EMOTIONS } from '@constants/EMOTIONS';
import { getSharedEmotionsCounts } from '@functions/getSharedEmotionsStats';
import { ChatMoodScreenProps } from '@screens/account/ChatMoodScreen/ChatMoodScreen.props';
import { ChatMoodScreenStyle } from '@screens/account/ChatMoodScreen/ChatMoodScreen.style';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { Loader } from '@components/general/Loader/Loader';
import { EmotionsBreakdown } from '@components/emotions/EmotionsBreakdown/EmotionsBreakdown';
import { SharedEmotionItem } from '@components/emotions/SharedEmotionItem/SharedEmotionItem';

const DAYS = 30;
const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const DAY_FORMAT = 'YYYY-MM-DD';

export const ChatMoodScreen = ({ route }: ChatMoodScreenProps): JSX.Element => {
  const { friend } = route.params;

  const { top, bottom } = useSafeAreaInsets();
  const { jumpTo, jumpingId } = useJumpToMessage(friend);

  // Today and the days before it, in the device timezone
  const days = useMemo(() => {
    const start = moment()
      .startOf('day')
      .subtract(DAYS - 1, 'days');
    return Array.from({ length: DAYS }, (_, index) =>
      start.clone().add(index, 'days')
    );
  }, []);

  // The friend's emotions in the chat, newest first, undefined until loaded
  const [emotions, setEmotions] = useState<MessageInterface[]>();
  const [selectedDay, setSelectedDay] = useState<string>();

  useEffect(() => {
    getRequest<ResponseChatEmotionsGetInterface>(
      `chats/${friend.id}/emotions?senderId=${friend.id}&from=${days[0].unix()}`
    ).subscribe((response: ResponseChatEmotionsGetInterface) => {
      setEmotions(response?.data ?? []);
    });
  }, [days, friend.id]);

  const emotionsByDay = useMemo(() => {
    const map = new Map<string, MessageInterface[]>();
    (emotions ?? []).forEach((item) => {
      const key = moment.unix(item.time).format(DAY_FORMAT);
      map.set(key, (map.get(key) ?? []).concat(item));
    });
    return map;
  }, [emotions]);

  const listed = useMemo(
    () => (selectedDay ? emotionsByDay.get(selectedDay) ?? [] : emotions ?? []),
    [emotions, emotionsByDay, selectedDay]
  );
  const counts = useMemo(() => getSharedEmotionsCounts(listed), [listed]);

  const today = moment().format(DAY_FORMAT);
  // Monday first, the first day starts in its weekday's column
  const leadingDays = days[0].isoWeekday() - 1;

  const header = (
    <>
      <Text style={ChatMoodScreenStyle.subtitleText}>
        How {friend.name} felt in the last {DAYS} days
      </Text>
      <View style={ChatMoodScreenStyle.card}>
        <View style={ChatMoodScreenStyle.weekRow}>
          {WEEKDAYS.map((item) => (
            <Text key={item} style={ChatMoodScreenStyle.weekdayText}>
              {item}
            </Text>
          ))}
        </View>
        <View style={ChatMoodScreenStyle.daysView}>
          {Array.from({ length: leadingDays }, (_, index) => (
            <View key={`empty-${index}`} style={ChatMoodScreenStyle.dayCell} />
          ))}
          {days.map((day) => {
            const key = day.format(DAY_FORMAT);
            const dayEmotions = emotionsByDay.get(key) ?? [];
            // Newest first, the day shows how it ended
            const emotion = dayEmotions.find((item) => item.emotion)?.emotion;
            const color = EMOTIONS.find((item) => item.type === emotion)?.color;

            return (
              <View key={key} style={ChatMoodScreenStyle.dayCell}>
                <Pressable
                  disabled={!dayEmotions.length}
                  onPress={() =>
                    setSelectedDay((current) =>
                      current === key ? undefined : key
                    )
                  }
                  style={[
                    ChatMoodScreenStyle.day,
                    !!color && { backgroundColor: color },
                    selectedDay === key && ChatMoodScreenStyle.daySelected
                  ]}
                >
                  {emotion ? (
                    <Text style={ChatMoodScreenStyle.dayEmoji}>{emotion}</Text>
                  ) : (
                    <Text
                      style={[
                        ChatMoodScreenStyle.dayNumber,
                        key === today && ChatMoodScreenStyle.todayNumber
                      ]}
                    >
                      {day.date()}
                    </Text>
                  )}
                </Pressable>
              </View>
            );
          })}
        </View>
      </View>
      {!!listed.length && (
        <View style={ChatMoodScreenStyle.card}>
          <EmotionsBreakdown counts={counts} total={listed.length} />
        </View>
      )}
      {!!listed.length && (
        <Text style={ChatMoodScreenStyle.sectionTitle}>
          {selectedDay
            ? moment(selectedDay, DAY_FORMAT).format('dddd D. M.')
            : 'History'}
        </Text>
      )}
    </>
  );

  return (
    <View style={[ChatMoodScreenStyle.container, { paddingTop: top }]}>
      <ScreenHeader title="Mood overview" />
      <FlatList
        data={listed}
        extraData={jumpingId}
        keyExtractor={(item: MessageInterface) => String(item.id)}
        renderItem={({ item }) => (
          <SharedEmotionItem
            item={item}
            onPress={() => {
              if (jumpingId === undefined) {
                jumpTo(item.id);
              }
            }}
          />
        )}
        ListHeaderComponent={emotions ? header : null}
        ListEmptyComponent={
          emotions ? (
            <Text style={ChatMoodScreenStyle.listEmptyText}>
              {friend.name} hasn&apos;t shared any emotions with you
              in the last {DAYS} days
            </Text>
          ) : null
        }
        contentContainerStyle={[
          ChatMoodScreenStyle.contentContainer,
          { paddingBottom: bottom + 30 }
        ]}
      />
      {!emotions && <Loader />}
    </View>
  );
};

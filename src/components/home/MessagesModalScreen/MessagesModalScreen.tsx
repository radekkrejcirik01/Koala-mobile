import React, { useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMessagesActions } from '@hooks/useMessagesActions';
import { useTheme } from '@contexts/ThemeContext';
import { MessagesModalScreenStyle } from '@components/home/MessagesModalScreen/MessagesModalScreen.style';
import COLORS from '@constants/COLORS';
import { MessagesStyle } from '@components/home/Messages/Messages.style';
import { Modal } from '@components/general/Modal/Modal';
import { EmotionInterface } from '@interfaces/general.interface';
import {
  CHECK_ON_MESSAGES,
  KUDOS_MESSAGES
} from '@components/home/MessagesModalScreen/MessagesModalScreen.const';

type TabItem = {
  id: number;
  name: string;
  content: EmotionInterface[];
};

export const MessagesModalScreen = () => {
  const { theme } = useTheme();
  const { bottom } = useSafeAreaInsets();

  const [selected, setSelected] = useState<number>(1);

  const {
    messages: customMessages,
    modalScreen,
    modalVisible,
    onPressMessage,
    onPressAddEmotion,
    onItemLongPress,
    hideModalAndKeyboard
  } = useMessagesActions(() => {
    setSelected(0);
  });

  const tabs = useMemo(
    (): TabItem[] => [
      { id: 1, name: 'Custom', content: customMessages },
      { id: 2, name: 'Not feeling best 🤕', content: CHECK_ON_MESSAGES },
      { id: 3, name: 'Wins 🎉', content: CHECK_ON_MESSAGES },
      { id: 4, name: 'Kudos 🫶', content: KUDOS_MESSAGES },
      { id: 5, name: 'Check-on 🙋', content: CHECK_ON_MESSAGES }
    ],
    [customMessages]
  );

  const renderContent = () => {
    const tab = tabs[selected];

    return tab?.content?.map((item) => {
      const onLongPress = () => {
        if (tab.id === 1) {
          onItemLongPress(item);
        }
      };

      return (
        <TouchableOpacity
          key={item.id}
          style={MessagesModalScreenStyle.contentButtonView}
          delayLongPress={120}
          onLongPress={onLongPress}
          onPress={() => onPressMessage(item)}
        >
          <Text style={MessagesModalScreenStyle.contentButtonText}>
            {item.message}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View
      style={[
        MessagesModalScreenStyle.container,
        {
          backgroundColor: theme.colors.background,
          paddingBottom: bottom || 10
        }
      ]}
    >
      <View style={MessagesModalScreenStyle.headerView}>
        <Text style={MessagesModalScreenStyle.title}>Messages</Text>
        <TouchableOpacity hitSlop={10} onPress={onPressAddEmotion}>
          <Text style={MessagesModalScreenStyle.addText}>Add +</Text>
        </TouchableOpacity>
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={MessagesModalScreenStyle.tabScrollView}
          contentContainerStyle={
            MessagesModalScreenStyle.tabScrollViewContainer
          }
        >
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={tab.id}
              activeOpacity={1}
              onPress={() => setSelected(index)}
              style={[
                MessagesModalScreenStyle.tabButtonView,
                {
                  backgroundColor:
                    selected === index ? COLORS.PURPLE : theme.colors.surface
                }
              ]}
            >
              <Text
                style={[
                  MessagesModalScreenStyle.tabButtonText,
                  {
                    color:
                      selected === index ? COLORS.WHITE : COLORS.LIGHTGRAY_200
                  }
                ]}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView style={MessagesModalScreenStyle.contentScrollView}>
        {renderContent()}
      </ScrollView>
      <Modal
        isVisible={modalVisible}
        content={modalScreen}
        onClose={hideModalAndKeyboard}
        style={MessagesStyle.modal}
      />
    </View>
  );
};

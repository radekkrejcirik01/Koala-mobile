import React, { useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@contexts/ThemeContext';
import { MessagesModalScreenStyle } from '@components/home/MessagesModalScreen/MessagesModalScreen.style';
import COLORS from '@constants/COLORS';
import { SLEEPY } from '@components/home/MessagesModalScreen/MessagesModalScreen.const';

type TabItem = {
  id: number;
  name: string;
};

type MessageItem = {
  id: number;
  message: string;
};

type TabsContentType = {
  [key: string]: MessageItem[];
};

enum TabTitles {
  Custom = 'Custom',
  Sleepy = 'Sleepy',
  Wins = 'Wins',
  Kudos = 'Kudos',
  CheckOn = 'Check-on'
}

const TABS: TabItem[] = [
  { id: 1, name: TabTitles.Custom },
  { id: 2, name: TabTitles.Sleepy },
  { id: 3, name: TabTitles.Wins },
  { id: 4, name: TabTitles.Kudos },
  { id: 5, name: TabTitles.CheckOn }
];

const TABS_CONTENT: TabsContentType = {
  [TabTitles.Sleepy]: SLEEPY,
  [TabTitles.Wins]: SLEEPY,
  [TabTitles.Kudos]: SLEEPY,
  [TabTitles.CheckOn]: SLEEPY
};

export const MessagesModalScreen = () => {
  const { theme } = useTheme();
  const { bottom } = useSafeAreaInsets();

  const [selected, setSelected] = useState<TabTitles>(TabTitles.Sleepy);
  const [customMessages, setCustomMessages] = useState<MessageItem[]>([
    { id: 1, message: 'Custom' }
  ]);

  const renderContent = useMemo(() => {
    let content;

    if (selected === TabTitles.Custom) {
      content = customMessages;
    } else {
      content = TABS_CONTENT[selected];
    }

    return content?.map((item) => (
      <View key={item.id} style={{ marginTop: 10, paddingHorizontal: 20 }}>
        <Text>{item.message}</Text>
      </View>
    ));
  }, [customMessages, selected]);

  return (
    <View
      style={[
        MessagesModalScreenStyle.container,
        {
          backgroundColor: theme.colors.surface,
          paddingBottom: bottom || 10
        }
      ]}
    >
      <Text style={MessagesModalScreenStyle.title}>Messages</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={MessagesModalScreenStyle.scrollView}
        contentContainerStyle={MessagesModalScreenStyle.scrollViewContainer}
      >
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            activeOpacity={1}
            onPress={() => setSelected(tab.name as TabTitles)}
            style={[
              MessagesModalScreenStyle.tabButtonView,
              {
                backgroundColor:
                  selected === tab.name ? COLORS.PURPLE : COLORS.WHITE
              }
            ]}
          >
            <Text
              style={[
                MessagesModalScreenStyle.tabButtonText,
                {
                  color: selected === tab.name ? COLORS.WHITE : COLORS.BLACK
                }
              ]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {renderContent}
    </View>
  );
};

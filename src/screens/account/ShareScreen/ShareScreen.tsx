import React, { JSX, useCallback, useMemo, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@hooks/useNavigation';
import { useTheme } from '@hooks/useTheme';
import { EmotionType } from '@enums/EmotionType';
import { EMOTIONS } from '@constants/EMOTIONS';
import { EmotionItem } from '@components/home/EmotionItem/EmotionItem';
import { HomeButton } from '@components/home/HomeButton/HomeButton';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { AccountStackNavigatorEnum } from '@navigation/StackNavigators/account/AccountStackNavigator.enum';
import { ShareScreenStyle } from '@screens/account/ShareScreen/ShareScreen.style';

export const ShareScreen = (): JSX.Element => {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const { navigateTo } = useNavigation();

  const [emotion, setEmotion] = useState<EmotionType>();

  const selectedConfig = useMemo(
    () => EMOTIONS.find((item) => item.type === emotion),
    [emotion]
  );

  const title = selectedConfig?.message ?? 'How are we feeling?';

  const onEmotionSelect = useCallback((type: EmotionType) => {
    setEmotion((current) => (current === type ? undefined : type));
  }, []);

  const onNext = useCallback(() => {
    if (!emotion) {
      Alert.alert('Please select how you are feeling first');
      return;
    }

    navigateTo(AccountStackNavigatorEnum.ShareSendScreen, { emotion });
  }, [emotion, navigateTo]);

  return (
    <View
      style={[
        ShareScreenStyle.container,
        {
          backgroundColor: theme.theme.colors.background,
          paddingTop: 10,
          paddingBottom: bottom || 10
        }
      ]}
    >
      <ScreenHeader title="Share" />
      <View style={ShareScreenStyle.mainView}>
        <View style={ShareScreenStyle.titleView}>
          {selectedConfig && (
            <Text style={ShareScreenStyle.selectedEmoji}>
              {selectedConfig.type}
            </Text>
          )}
          <Text
            style={[
              ShareScreenStyle.title,
              { color: theme.theme.colors.text }
            ]}
          >
            {title}
          </Text>
        </View>
        <View style={ShareScreenStyle.contentView}>
          <View style={ShareScreenStyle.emotionsView}>
            {EMOTIONS.map((item) => (
              <EmotionItem
                key={item.type}
                emotion={item}
                selected={emotion === item.type}
                onPress={() => onEmotionSelect(item.type)}
              />
            ))}
          </View>
        </View>
      </View>
      <View style={ShareScreenStyle.nextButtonView}>
        <HomeButton text="Next" onPress={onNext} />
      </View>
    </View>
  );
};

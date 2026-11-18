import React, { JSX } from 'react';
import { Platform, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import moment from 'moment';
import { useTheme } from '@hooks/useTheme';
import { UserInterface } from '@interfaces/general.interface';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { SharedEmotionScreenProps } from '@screens/account/SharedEmotionScreen/SharedEmotionScreen.props';
import { SharedEmotionScreenStyle } from '@screens/account/SharedEmotionScreen/SharedEmotionScreen.style';

// Presented as a modal from the Analytics history, like the Share screen
export const SharedEmotionScreen = ({
  route
}: SharedEmotionScreenProps): JSX.Element => {
  const { item } = route.params;

  const { top, bottom } = useSafeAreaInsets();
  const { colors } = useTheme().theme;

  const recipients = item.recipients ?? [];

  return (
    <View
      style={[
        SharedEmotionScreenStyle.container,
        {
          backgroundColor: colors.background,
          // The modal is a sheet on iOS but full screen on Android
          paddingTop: Platform.OS === 'android' ? Math.max(top - 6, 0) : 10
        }
      ]}
    >
      <ScreenHeader title="Shared emotion" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          SharedEmotionScreenStyle.contentContainer,
          { paddingBottom: (bottom || 10) + 20 }
        ]}
      >
        <View style={SharedEmotionScreenStyle.emojiView}>
          <Text style={SharedEmotionScreenStyle.emojiText}>
            {item.emotion || '•'}
          </Text>
        </View>
        <Text
          style={[SharedEmotionScreenStyle.messageText, { color: colors.text }]}
        >
          {item.message || 'No message'}
        </Text>
        <Text style={SharedEmotionScreenStyle.timeText}>
          {moment.unix(item.time).format('ddd D. M. YYYY · HH:mm')}
        </Text>
        <Text style={SharedEmotionScreenStyle.sectionTitle}>Sent to</Text>
        {recipients.length ? (
          recipients.map((recipient: UserInterface) => (
            <View
              key={recipient.id ?? recipient.username}
              style={SharedEmotionScreenStyle.recipientView}
            >
              <ProfilePhoto
                name={recipient.name}
                photo={recipient.profilePhoto}
                size={40}
                style={SharedEmotionScreenStyle.profilePhoto}
                imageStyle={SharedEmotionScreenStyle.profilePhotoShape}
                acronymStyle={SharedEmotionScreenStyle.profilePhotoShape}
              />
              <Text
                numberOfLines={1}
                style={[
                  SharedEmotionScreenStyle.nameText,
                  { color: colors.text }
                ]}
              >
                {recipient.name}
              </Text>
            </View>
          ))
        ) : (
          // Private logs have none, and so do shares from before recipients
          // were recorded, the backend can't tell them apart
          <Text style={SharedEmotionScreenStyle.emptyText}>
            Emotion was not shared with anyone
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

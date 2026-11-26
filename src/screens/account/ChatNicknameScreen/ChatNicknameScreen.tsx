import React, { JSX, useCallback, useState } from 'react';
import { Alert, Keyboard, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useTheme } from '@hooks/useTheme';
import { useNavigation } from '@hooks/useNavigation';
import { putRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { ChatSettingsPostInterface } from '@interfaces/post/Post.interface';
import COLORS from '@constants/COLORS';
import { ChatNicknameScreenProps } from '@screens/account/ChatNicknameScreen/ChatNicknameScreen.props';
import { useChatNicknameScreenStyle } from '@screens/account/ChatNicknameScreen/ChatNicknameScreen.style';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { Button } from '@components/general/Button/Button';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { ProfileSection } from '@components/profile/ProfileSection/ProfileSection';

const NICKNAME_MAX_LENGTH = 32;

export const ChatNicknameScreen = ({
  route
}: ChatNicknameScreenProps): JSX.Element => {
  const ChatNicknameScreenStyle = useChatNicknameScreenStyle();
  const { friend } = route.params;

  const theme = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  const { navigateBack } = useNavigation();

  const [nickname, setNickname] = useState<string>(friend.nickname ?? '');
  const [posting, setPosting] = useState<boolean>(false);

  // An empty nickname removes it, the friend's own name shows again
  const save = useCallback(() => {
    setPosting(true);

    putRequest<ResponseInterface, ChatSettingsPostInterface>(
      `chats/${friend.id}/settings`,
      { nickname: nickname.trim() || null }
    ).subscribe((response: ResponseInterface) => {
      setPosting(false);

      if (response?.status) {
        navigateBack();
        return;
      }

      Alert.alert('Failed to save. Please try again.');
    });
  }, [friend.id, navigateBack, nickname]);

  return (
    <View style={[ChatNicknameScreenStyle.container, { paddingTop: top }]}>
      <ScreenHeader title="Edit name" />
      <KeyboardAwareScrollView
        bottomOffset={20}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={Keyboard.dismiss}
        contentContainerStyle={{ paddingBottom: bottom + 30 }}
      >
        <View style={ChatNicknameScreenStyle.photoView}>
          <ProfilePhoto
            name={nickname.trim() || friend.name}
            photo={friend.profilePhoto}
            size={80}
          />
        </View>
        <ProfileSection title="Name" footer="Only you see the edited name">
          <TextInput
            autoFocus
            autoCorrect={false}
            autoCapitalize="words"
            placeholder={friend.name}
            placeholderTextColor={theme.theme.colors.placeholder}
            selectionColor={COLORS.BUTTON_BLUE}
            maxLength={NICKNAME_MAX_LENGTH}
            returnKeyType="done"
            onSubmitEditing={save}
            value={nickname}
            onChangeText={setNickname}
            style={[
              ChatNicknameScreenStyle.input,
              { color: theme.theme.colors.text }
            ]}
          />
        </ProfileSection>
        <Button
          title="Save"
          posting={posting}
          onPress={save}
          style={ChatNicknameScreenStyle.button}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

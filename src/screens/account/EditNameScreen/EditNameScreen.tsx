import React, { JSX, useCallback, useState } from 'react';
import { Alert, Keyboard, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useTheme } from '@hooks/useTheme';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { EditNameScreenStyle } from '@screens/account/EditNameScreen/EditNameScreen.style';
import { ReducerProps } from '@store/index/index.props';
import { putRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { ChangeNamePostInterface } from '@interfaces/post/Post.interface';
import { setNameAction } from '@store/UserReducer';
import { Button } from '@components/general/Button/Button';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { ProfileSection } from '@components/profile/ProfileSection/ProfileSection';
import COLORS from '@constants/COLORS';

export const EditNameScreen = (): JSX.Element => {
  const { name: firstname, profilePhoto } = useSelector(
    (state: ReducerProps) => state.user.user
  );

  const dispatch = useDispatch();
  const theme = useTheme();
  const { top, bottom } = useSafeAreaInsets();

  const [name, setName] = useState<string>(firstname);
  const [posting, setPosting] = useState<boolean>(false);

  const save = useCallback(() => {
    if (!name) {
      Alert.alert('Please type a name');
      return;
    }

    setPosting(true);

    putRequest<ResponseInterface, ChangeNamePostInterface>('user-name', {
      name
    }).subscribe((response: ResponseInterface) => {
      setPosting(false);

      if (response?.status) {
        dispatch(setNameAction(name));
        Alert.alert('Successfully changed name');
      }
    });
  }, [dispatch, name]);

  return (
    <View style={[EditNameScreenStyle.container, { paddingTop: top }]}>
      <ScreenHeader title="Edit name" />
      <KeyboardAwareScrollView
        bottomOffset={20}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={Keyboard.dismiss}
        contentContainerStyle={{ paddingBottom: bottom + 30 }}
      >
        <View style={EditNameScreenStyle.photoView}>
          <ProfilePhoto
            name={name}
            photo={profilePhoto}
            size={80}
            textBackgroundColor={COLORS.PASTEL_PURPLE}
          />
        </View>
        <ProfileSection
          title="Name"
          footer="This is how your friends will see you in Koala."
        >
          <TextInput
            autoCorrect={false}
            autoCapitalize="words"
            placeholder="Your name"
            placeholderTextColor={COLORS.LIGHTGRAY_100}
            selectionColor={COLORS.BUTTON_BLUE}
            returnKeyType="done"
            onSubmitEditing={save}
            value={name}
            onChangeText={setName}
            style={[
              EditNameScreenStyle.input,
              { color: theme.theme.colors.text }
            ]}
          />
        </ProfileSection>
        <Button
          title="Save"
          posting={posting}
          onPress={save}
          style={EditNameScreenStyle.button}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

import React, { JSX, useCallback, useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenHeader } from '@components/general/ScreenHeader/ScreenHeader';
import { EditNameScreenStyle } from '@screens/account/EditNameScreen/EditNameScreen.style';
import { ReducerProps } from '@store/index/index.props';
import { putRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { ChangeNamePostInterface } from '@interfaces/post/Post.interface';
import { setNameAction } from '@store/UserReducer';
import { Button } from '@components/general/Button/Button';

export const EditNameScreen = (): JSX.Element => {
  const { name: firstname } = useSelector(
    (state: ReducerProps) => state.user.user
  );

  const dispatch = useDispatch();
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
    <View
      style={[
        EditNameScreenStyle.container,
        { paddingTop: top, paddingBottom: bottom + 10 }
      ]}
    >
      <ScreenHeader title="Edit name" />
      <View style={EditNameScreenStyle.contentView}>
        <Text style={EditNameScreenStyle.inputTitleText}>Name</Text>
        <TextInput
          autoFocus
          autoCorrect={false}
          autoCapitalize="none"
          value={name}
          onChangeText={setName}
          style={EditNameScreenStyle.input}
        />
      </View>
      <Button
        title="Save it"
        posting={posting}
        onPress={save}
        style={EditNameScreenStyle.button}
      />
    </View>
  );
};

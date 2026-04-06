import React, { JSX } from 'react';
import { Text } from 'react-native';
import { AddFriendsDescriptionButtonStyle } from '@components/friends/AddFriendsDescriptionButton/AddFriendsDescriptionButton.style';

export const AddFriendsDescriptionButton = (): JSX.Element => (
  <Text adjustsFontSizeToFit style={AddFriendsDescriptionButtonStyle.view}>
    {`Added friends will\nshow up here`}
  </Text>
);

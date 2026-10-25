import React, { JSX, useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { FriendListItemProps } from '@components/friends/FriendListItem/FriendListItem.props';
import { FriendListItemStyle } from '@components/friends/FriendListItem/FriendListItem.style';

export const FriendListItem = ({
  item,
  onSelect,
  sent
}: FriendListItemProps): JSX.Element => {
  const theme = useTheme();

  const [selected, setSelected] = useState<boolean>(false);

  const onPress = useCallback(() => {
    setSelected((value) => !value);
    onSelect();
  }, [onSelect]);

  useEffect(() => {
    if (sent) {
      setSelected(false);
    }
  }, [sent]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={FriendListItemStyle.container}
    >
      <ProfilePhoto
        name={item.name}
        photo={item?.profilePhoto}
        size={40}
        style={FriendListItemStyle.profilePhoto}
        imageStyle={FriendListItemStyle.profilePhotoShape}
        acronymStyle={FriendListItemStyle.profilePhotoShape}
      />
      <Text
        adjustsFontSizeToFit
        style={[
          FriendListItemStyle.nameText,
          { color: theme.theme.colors.text }
        ]}
      >
        {item.name}
      </Text>
      <View
        style={[
          FriendListItemStyle.checkSquare,
          selected && FriendListItemStyle.checkSquareSelected
        ]}
      >
        {selected && <Text style={FriendListItemStyle.checkMark}>✓</Text>}
      </View>
    </TouchableOpacity>
  );
};

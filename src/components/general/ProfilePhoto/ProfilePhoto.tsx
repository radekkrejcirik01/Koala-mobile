import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  ProfilePhotoDefaultProps,
  ProfilePhotoProps
} from '@components/general/ProfilePhoto/ProfilePhoto.props';
import COLORS from '@constants/COLORS';
import { ProfilePhotoStyle } from '@components/general/ProfilePhoto/ProfilePhoto.style';

export const ProfilePhoto = ({
  name,
  photo,
  size,
  textBackgroundColor,
  onPhotoPress,
  style,
  acronymStyle
}: ProfilePhotoProps): JSX.Element => (
  <TouchableOpacity
    disabled={!onPhotoPress}
    onPress={onPhotoPress}
    style={[ProfilePhotoStyle.container, style]}
  >
    {photo ? (
      <FastImage
        source={{
          uri: photo
        }}
        style={[
          ProfilePhotoStyle.image,
          {
            width: size,
            height: size
          }
        ]}
      />
    ) : (
      <View
        style={[
          ProfilePhotoStyle.acronymView,
          {
            height: size,
            width: size,
            backgroundColor: textBackgroundColor || COLORS.LIGHTGRAY
          },
          acronymStyle
        ]}
      >
        <Text
          style={[
            ProfilePhotoStyle.acronymText,
            {
              fontSize: size / 2
            }
          ]}
        >
          {!!name?.length && name[0]}
        </Text>
      </View>
    )}
  </TouchableOpacity>
);

ProfilePhoto.defaultProps = ProfilePhotoDefaultProps;

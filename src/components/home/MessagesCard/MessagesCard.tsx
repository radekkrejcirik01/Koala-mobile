import React, { JSX } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  MessagesCardDefaultProps,
  MessagesCardProps
} from '@components/home/MessagesCard/MessagesCard.props';
import { MessagesCardStyle } from '@components/home/MessagesCard/MessagesCard.style';
import COLORS from '@constants/COLORS';
import { useTheme } from '../../../ThemeContext';

export const MessagesCard = ({
  title,
  onPress,
  image,
  imageStyle,
  isKudos
}: MessagesCardProps): JSX.Element => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        MessagesCardStyle.view,
        { backgroundColor: theme.theme.colors.surface },
        isKudos && { backgroundColor: COLORS.PURPLE }
      ]}
    >
      <Text
        style={[
          MessagesCardStyle.text,
          { color: theme.theme.colors.text },
          isKudos && { color: COLORS.WHITE }
        ]}
      >
        {title}
      </Text>
      <FastImage source={image} style={imageStyle} />
    </TouchableOpacity>
  );
};

MessagesCard.defaultProps = MessagesCardDefaultProps;

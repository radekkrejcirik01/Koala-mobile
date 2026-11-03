import React, { JSX } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { FormIntroProps } from '@components/profile/FormIntro/FormIntro.props';
import { FormIntroStyle } from '@components/profile/FormIntro/FormIntro.style';

export const FormIntro = ({
  emoji,
  emojiBackgroundColor,
  title,
  description
}: FormIntroProps): JSX.Element => {
  const theme = useTheme();
  return (
    <View style={FormIntroStyle.container}>
      <View
        style={[
          FormIntroStyle.emojiView,
          { backgroundColor: emojiBackgroundColor }
        ]}
      >
        <Text style={FormIntroStyle.emoji}>{emoji}</Text>
      </View>
      <Text style={[FormIntroStyle.title, { color: theme.theme.colors.text }]}>
        {title}
      </Text>
      <Text style={FormIntroStyle.description}>{description}</Text>
    </View>
  );
};

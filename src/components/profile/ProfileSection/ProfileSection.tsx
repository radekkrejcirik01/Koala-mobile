import React, { JSX } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { ProfileSectionProps } from '@components/profile/ProfileSection/ProfileSection.props';
import { ProfileSectionStyle } from '@components/profile/ProfileSection/ProfileSection.style';

export const ProfileSection = ({
  title,
  footer,
  children
}: ProfileSectionProps): JSX.Element => {
  const theme = useTheme();
  return (
    <View style={ProfileSectionStyle.container}>
      {!!title && <Text style={ProfileSectionStyle.title}>{title}</Text>}
      <View
        style={[
          ProfileSectionStyle.card,
          { backgroundColor: theme.theme.colors.surface }
        ]}
      >
        {children}
      </View>
      {!!footer && <Text style={ProfileSectionStyle.footer}>{footer}</Text>}
    </View>
  );
};

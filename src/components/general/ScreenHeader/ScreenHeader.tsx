import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ScreenHeaderProps } from '@components/general/ScreenHeader/ScreenHeader.props';
import { ScreenHeaderStyle } from '@components/general/ScreenHeader/ScreenHeader.style';
import { BackButton } from '@components/general/BackButton/BackButton';
import { useTheme } from '@contexts/ThemeContext';
import { useNavigation } from '@hooks/useNavigation';
import { RootStackNavigatorEnum } from '@navigation/RootNavigator/RootStackNavigator.enum';

export const ScreenHeader = ({
  title,
  rightComponent,
  goBack = true,
  close = false
}: ScreenHeaderProps): React.JSX.Element => {
  const theme = useTheme();
  const { navigateBack } = useNavigation(RootStackNavigatorEnum.AccountStack);

  return (
    <View style={ScreenHeaderStyle.container}>
      <View style={ScreenHeaderStyle.flex}>
        {goBack && !close && <BackButton />}
      </View>
      <Text
        style={[
          ScreenHeaderStyle.titleText,
          { color: theme.theme.colors.text }
        ]}
      >
        {title}
      </Text>
      <View style={[ScreenHeaderStyle.flex, { alignItems: 'flex-end' }]}>
        {close ? (
          <TouchableOpacity activeOpacity={0.7} onPress={navigateBack}>
            <Text style={ScreenHeaderStyle.closeText}>Close</Text>
          </TouchableOpacity>
        ) : (
          rightComponent
        )}
      </View>
    </View>
  );
};

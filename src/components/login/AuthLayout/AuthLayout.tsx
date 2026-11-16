import React, { JSX } from 'react';
import { Keyboard, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@hooks/useTheme';
import { BackButton } from '@components/general/BackButton/BackButton';
import { AuthLayoutProps } from '@components/login/AuthLayout/AuthLayout.props';
import { AuthLayoutStyle } from '@components/login/AuthLayout/AuthLayout.style';

const KEYBOARD_GAP = 12;

export const AuthLayout = ({
  headerTitle,
  title,
  subtitle,
  step,
  totalSteps,
  footer,
  children
}: AuthLayoutProps): JSX.Element => {
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();

  const footerBottom = Math.max(bottom, 16);

  return (
    // Avoiding view shrinks the content so the footer never covers the inputs;
    // the negative offset tucks the footer's safe area padding behind the keyboard
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={KEYBOARD_GAP - footerBottom}
      style={[AuthLayoutStyle.container, { paddingTop: top }]}
    >
      <View style={AuthLayoutStyle.header}>
        {!!headerTitle && (
          <View pointerEvents="none" style={AuthLayoutStyle.headerTitleView}>
            <Text
              style={[
                AuthLayoutStyle.headerTitle,
                { color: theme.theme.colors.text }
              ]}
            >
              {headerTitle}
            </Text>
          </View>
        )}
        <BackButton />
        {!!step && !!totalSteps && (
          <>
            <View style={AuthLayoutStyle.progress}>
              {Array.from({ length: totalSteps }, (_, index) => (
                <View
                  key={index}
                  style={[
                    AuthLayoutStyle.progressSegment,
                    index < step && AuthLayoutStyle.progressSegmentActive
                  ]}
                />
              ))}
            </View>
            <Text style={AuthLayoutStyle.stepText}>
              {step}/{totalSteps}
            </Text>
          </>
        )}
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={Keyboard.dismiss}
        contentContainerStyle={AuthLayoutStyle.content}
      >
        {!!title && (
          <Animated.View entering={FadeInDown.duration(400)}>
            <Text
              style={[
                AuthLayoutStyle.title,
                !subtitle && AuthLayoutStyle.titleWithoutSubtitle,
                { color: theme.theme.colors.text }
              ]}
            >
              {title}
            </Text>
            {!!subtitle && (
              <Text style={AuthLayoutStyle.subtitle}>{subtitle}</Text>
            )}
          </Animated.View>
        )}
        <Animated.View entering={FadeInDown.duration(400).delay(100)}>
          {children}
        </Animated.View>
      </ScrollView>
      <View style={[AuthLayoutStyle.footer, { paddingBottom: footerBottom }]}>
        {footer}
      </View>
    </KeyboardAvoidingView>
  );
};

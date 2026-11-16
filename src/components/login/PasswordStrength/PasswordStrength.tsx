import React, { JSX } from 'react';
import { Text, View } from 'react-native';
import { PasswordStrengthProps } from '@components/login/PasswordStrength/PasswordStrength.props';
import { PasswordStrengthStyle } from '@components/login/PasswordStrength/PasswordStrength.style';
import COLORS from '@constants/COLORS';

const LEVELS = [
  { label: 'Weak', color: COLORS.EMOTION_MISERABLE },
  { label: 'Okay', color: COLORS.EMOTION_MEH },
  { label: 'Strong', color: COLORS.EMOTION_SUPER_GOOD }
];

const getScore = (password: string): number => {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/\d/.test(password) && /[a-zA-Z]/.test(password)) score += 1;
  if (
    /[^a-zA-Z0-9]/.test(password) ||
    /[A-Z].*[a-z]|[a-z].*[A-Z]/.test(password)
  ) {
    score += 1;
  }
  return Math.max(score, 1);
};

export const PasswordStrength = ({
  password
}: PasswordStrengthProps): JSX.Element | null => {
  if (!password) {
    return null;
  }

  const score = getScore(password);
  const level = LEVELS[score - 1];

  return (
    <View style={PasswordStrengthStyle.container}>
      <View style={PasswordStrengthStyle.bars}>
        {LEVELS.map((item, index) => (
          <View
            key={item.label}
            style={[
              PasswordStrengthStyle.bar,
              index < score && { backgroundColor: level.color }
            ]}
          />
        ))}
      </View>
      <Text style={[PasswordStrengthStyle.label, { color: level.color }]}>
        {level.label}
      </Text>
    </View>
  );
};

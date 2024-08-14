import React, { JSX } from 'react';
import { Text, View } from 'react-native';
import { ProfileHeaderStyle } from '@components/profile/ProfileHeader/ProfileHeader.style';

export const ProfileHeader = (): JSX.Element => (
    <View style={ProfileHeaderStyle.container}>
        <Text style={ProfileHeaderStyle.title}>Profile</Text>
    </View>
);

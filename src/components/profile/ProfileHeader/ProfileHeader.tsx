import React, { JSX } from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ProfileHeaderStyle } from '@components/profile/ProfileHeader/ProfileHeader.style';

export const ProfileHeader = (): JSX.Element => (
    <View style={ProfileHeaderStyle.container}>
        <FastImage
            source={require('../../../assets/images/koala.png')}
            style={ProfileHeaderStyle.image}
        />
        <Text style={ProfileHeaderStyle.titleText}>Profile</Text>
    </View>
);

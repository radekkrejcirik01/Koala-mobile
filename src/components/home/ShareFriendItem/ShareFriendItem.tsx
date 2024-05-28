import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { ShareFriendItemProps } from '@components/home/ShareFriendItem/ShareFriendItem.props';
import COLORS from '@constants/COLORS';
import { ShareFriendItemStyle } from '@components/home/ShareFriendItem/ShareFriendItem.style';

export const ShareFriendItem = ({
    item,
    onSelect,
    sent
}: ShareFriendItemProps): JSX.Element => {
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
            style={ShareFriendItemStyle.container}
        >
            <ProfilePhoto
                name={item.name}
                size={45}
                style={[
                    ShareFriendItemStyle.profilePhoto,
                    selected && {
                        borderColor: COLORS.BUTTON_BLUE
                    }
                ]}
            />
            <Text adjustsFontSizeToFit style={ShareFriendItemStyle.nameText}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );
};

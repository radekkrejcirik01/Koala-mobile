import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { ShareFriendItemProps } from '@components/home/ShareFriendItem/ShareFriendItem.props';
import COLORS from '@constants/COLORS';
import { ShareFriendItemStyle } from '@components/home/ShareFriendItem/ShareFriendItem.style';

export const ShareFriendItem = ({
    item,
    onPress,
    sent
}: ShareFriendItemProps): JSX.Element => {
    const [selected, setSelected] = useState<boolean>(false);

    return (
        <TouchableOpacity
            activeOpacity={1}
            disabled={sent}
            onPress={() => {
                setSelected(!selected);
                onPress();
            }}
            style={ShareFriendItemStyle.container}
        >
            <ProfilePhoto
                name={item.name}
                size={45}
                style={[
                    ShareFriendItemStyle.profilePhoto,
                    selected && {
                        borderColor: COLORS.BUTTON_BLUE
                    },
                    sent && selected && { borderColor: COLORS.MAIN_GREEN }
                ]}
            />
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );
};

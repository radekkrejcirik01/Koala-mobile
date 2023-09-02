import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { ShareFriendItemProps } from '@components/home/ShareFriendItem/ShareFriendItem.props';
import COLORS from '@constants/COLORS';

export const ShareFriendItem = ({
    item,
    onPress
}: ShareFriendItemProps): JSX.Element => {
    const [selected, setSelected] = useState<boolean>(false);

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
                setSelected(!selected);
                onPress();
            }}
            style={{
                margin: 4,
                alignItems: 'center'
            }}
        >
            <ProfilePhoto
                name={item.name}
                size={45}
                style={[
                    { borderWidth: 2, borderColor: COLORS.TRANSPARENT },
                    selected && {
                        borderColor: COLORS.BUTTON_BLUE
                    }
                ]}
            />
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );
};

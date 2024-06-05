import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ProfilePhoto } from '@components/general/ProfilePhoto/ProfilePhoto';
import { SelectFriendItemProps } from '@components/friends/SelectFriendItem/SelectFriendItem.props';
import COLORS from '@constants/COLORS';
import { SelectFriendItemStyle } from '@components/friends/SelectFriendItem/SelectFriendItem.style';

export const SelectFriendItem = ({
    item,
    onSelect,
    sent
}: SelectFriendItemProps): JSX.Element => {
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
            style={SelectFriendItemStyle.container}
        >
            <ProfilePhoto
                name={item.name}
                size={45}
                style={[
                    SelectFriendItemStyle.profilePhoto,
                    selected && {
                        borderColor: COLORS.BUTTON_BLUE
                    }
                ]}
            />
            <Text adjustsFontSizeToFit style={SelectFriendItemStyle.nameText}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );
};

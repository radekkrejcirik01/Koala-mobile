import { useCallback, useEffect, useState } from 'react';
import { UserInterface } from '@interfaces/general.interface';
import { getRequest } from '@utils/Axios/Axios.service';
import { ResponseFriendsGetInterface } from '@interfaces/response/Response.interface';

export const useFriends = (
    onLoaded?: () => void
): {
    friends: UserInterface[];
    loadFriends: () => void;
} => {
    const [friends, setFriends] = useState<UserInterface[]>([]);

    const loadFriends = useCallback(() => {
        getRequest<ResponseFriendsGetInterface>('friends').subscribe(
            (response: ResponseFriendsGetInterface) => {
                if (response?.status) {
                    setFriends(response?.data);
                    onLoaded();
                }
            }
        );
    }, [onLoaded]);

    useEffect(() => {
        loadFriends();
    }, [loadFriends]);

    return { friends, loadFriends };
};

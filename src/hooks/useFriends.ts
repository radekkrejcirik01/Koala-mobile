import { useCallback, useEffect, useState } from 'react';
import { UserInterface } from '@interfaces/general.interface';
import { getRequest } from '@utils/Axios/Axios.service';
import { ResponseFriendsGetInterface } from '@interfaces/response/Response.interface';

export const useFriends = (): {
    friends: UserInterface[];
    loadFriends: () => void;
    loaded: boolean;
} => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [friends, setFriends] = useState<UserInterface[]>([]);

    const loadFriends = useCallback(() => {
        getRequest<ResponseFriendsGetInterface>('friends').subscribe(
            (response: ResponseFriendsGetInterface) => {
                if (response?.status) {
                    setFriends(response?.data);
                    setLoaded(true);
                }
            }
        );
    }, []);

    useEffect(() => {
        loadFriends();
    }, [loadFriends]);

    return { friends, loadFriends, loaded };
};

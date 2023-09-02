import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { postRequest } from '@utils/Axios/Axios.service';
import { ReducerProps } from '@store/index/index.props';
import { ResponseInterface } from '@interfaces/response/Response.interface';
import { DevicePostInterface } from '@interfaces/post/Post.interface';

export const useMessaging = (): {
    requestUserPermission: () => void;
} => {
    const { username } = useSelector((state: ReducerProps) => state.user.user);

    const [authorizationStatus, setIsAuthorizationStatus] =
        useState<boolean>(false);

    const requestUserPermission = async () => {
        const status = await messaging().requestPermission();
        setIsAuthorizationStatus(status === 1);
    };

    const registerDevice = useCallback(
        (fcmToken: string) =>
            postRequest<ResponseInterface, DevicePostInterface>('device', {
                deviceToken: fcmToken
            }).subscribe(),
        []
    );

    const getDeviceToken = useCallback(async () => {
        await messaging()
            .getToken()
            .then((fcmToken: string) => {
                registerDevice(fcmToken);
            });
    }, [registerDevice]);

    const onTokenRefresh = useCallback(() => {
        messaging().onTokenRefresh((fcmToken: string) => {
            registerDevice(fcmToken);
        });
    }, [registerDevice]);

    useEffect(() => {
        if (username) {
            requestUserPermission().catch();
        }
    }, [username]);

    useEffect(() => {
        if (username && authorizationStatus) {
            getDeviceToken().catch();
            onTokenRefresh();
        }
    }, [authorizationStatus, getDeviceToken, onTokenRefresh, username]);

    return { requestUserPermission };
};

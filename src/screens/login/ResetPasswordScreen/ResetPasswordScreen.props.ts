import { RouteProp } from '@react-navigation/native';

export interface ResetPasswordScreenProps {
  route: RouteProp<
    {
      params: {
        // The username the code was requested for, confirm needs the same one
        username: string;
        // The backend's answer to the request, shown as it is
        message: string;
      };
    },
    'params'
  >;
}

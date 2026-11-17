import { RouteProp } from '@react-navigation/native';

export interface ForgotPasswordScreenProps {
  route: RouteProp<
    {
      // Whatever was typed on the login screen
      params?: { username?: string };
    },
    'params'
  >;
}

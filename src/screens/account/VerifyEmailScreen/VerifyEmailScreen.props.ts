import { RouteProp } from '@react-navigation/native';

export interface VerifyEmailScreenProps {
  route: RouteProp<
    {
      params: {
        // The email the code was sent to
        email: string;
        onboarding?: boolean;
      };
    },
    'params'
  >;
}

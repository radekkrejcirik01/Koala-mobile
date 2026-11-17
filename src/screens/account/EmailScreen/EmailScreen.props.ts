import { RouteProp } from '@react-navigation/native';

export interface EmailScreenProps {
  route: RouteProp<
    {
      params?: {
        // Opened by the app asking for an email, not from the settings
        prompt?: boolean;
        // Opened right after sign up, as its last step
        onboarding?: boolean;
      };
    },
    'params'
  >;
}

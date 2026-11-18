import { RouteProp } from '@react-navigation/native';

export interface EmailScreenProps {
  route: RouteProp<
    {
      params?: {
        // Opened right after sign up, as its required last step
        onboarding?: boolean;
      };
    },
    'params'
  >;
}

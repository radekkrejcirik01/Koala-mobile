import { ReactNode } from 'react';

export interface AuthLayoutProps {
  headerTitle?: string;
  title?: string;
  subtitle?: string;
  step?: number;
  totalSteps?: number;
  footer: ReactNode;
  children: ReactNode;
}

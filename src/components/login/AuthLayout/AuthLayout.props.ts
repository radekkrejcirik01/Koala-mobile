import { ReactNode } from 'react';

export interface AuthLayoutProps {
  headerTitle?: string;
  title?: string;
  subtitle?: string;
  step?: number;
  totalSteps?: number;
  // For a required step that can't be left
  hideBack?: boolean;
  footer: ReactNode;
  children: ReactNode;
}

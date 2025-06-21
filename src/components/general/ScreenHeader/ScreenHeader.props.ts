import { JSX } from 'react';

export interface ScreenHeaderProps {
  title: string;
  rightComponent?: JSX.Element;
  goBack?: boolean;
}

export const ScreenHeaderDefaultProps: Omit<ScreenHeaderProps, 'title'> = {
  rightComponent: null
};

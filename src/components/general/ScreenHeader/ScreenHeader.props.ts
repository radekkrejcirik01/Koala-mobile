import { JSX } from 'react';

export interface ScreenHeaderProps {
    title: string;
    rightComponent?: JSX.Element;
}

export const ScreenHeaderDefaultProps: Omit<ScreenHeaderProps, 'title'> = {
    rightComponent: null
};

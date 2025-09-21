import { JSX } from 'react';

export interface ScreenHeaderProps {
  title: string;
  rightComponent?: JSX.Element;
  goBack?: boolean;
  close?: boolean;
}

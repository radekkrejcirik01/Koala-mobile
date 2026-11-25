import { ReactNode } from 'react';
import { MessageMenuIconName } from '@components/chat/MessageMenu/MessageMenuIcon';

export interface MessageMenuAction {
  label: string;
  icon: MessageMenuIconName;
  destructive?: boolean;
  // Runs once the menu closed, after the message settled back
  onPress: () => void;
}

export interface MessageMenuTarget {
  id: number;
  // A copy of the message, lifted above the dimmed chat
  preview: ReactNode;
  // Where the message sits on screen, the copy starts from there
  x: number;
  y: number;
  width: number;
  height: number;
  // Which side the reactions and actions line up with, an inbound bubble
  // starts after the friend's photo
  align: 'left' | 'right' | 'center';
  inset?: number;
  time: number;
  // Only on the friend's text messages
  reactions?: {
    current?: string;
    onSelect: (emoji: string) => void;
  };
  actions: MessageMenuAction[];
}

export interface MessageMenuProps {
  target: MessageMenuTarget | null;
  onClose: () => void;
  // The copy is on screen, the message in the chat can hide
  onShown: () => void;
  // The close animation finished, the message in the chat can show again
  onHidden: () => void;
  // The chat theme's color of the user's bubbles, tints the icons
  tintColor?: string;
}

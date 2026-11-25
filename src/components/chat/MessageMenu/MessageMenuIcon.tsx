import React from 'react';
import Svg, { Path, Polyline, Rect } from 'react-native-svg';

export type MessageMenuIconName = 'reply' | 'copy' | 'support' | 'delete';

interface MessageMenuIconProps {
  name: MessageMenuIconName;
  color: string;
  size?: number;
}

// Line icons, drawn after the Lucide set (ISC license)
export const MessageMenuIcon = ({
  name,
  color,
  size = 20
}: MessageMenuIconProps): React.JSX.Element => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {name === 'reply' && (
      <>
        <Polyline points="9 17 4 12 9 7" />
        <Path d="M20 18v-2a4 4 0 0 0-4-4H4" />
      </>
    )}
    {name === 'copy' && (
      <>
        <Rect x={8} y={8} width={14} height={14} rx={2} />
        <Path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </>
    )}
    {name === 'support' && (
      <Path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    )}
    {name === 'delete' && (
      <>
        <Path d="M3 6h18" />
        <Path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <Path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      </>
    )}
  </Svg>
);

export interface InboundMessageItemProps {
  children: string;
  onLongPress: () => void;
  replyMessage: string;
  audioMessage: string;
  showSpace: boolean;
  isLast: boolean;
}

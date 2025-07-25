export interface OutboundMessageItemProps {
  children: string;
  onLongPress: () => void;
  replyMessage: string;
  audioMessage: string;
  isFirst: boolean;
  isLast: boolean;
  isSending: boolean;
}

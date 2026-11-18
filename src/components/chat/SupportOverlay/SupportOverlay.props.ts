export interface SupportTarget {
  id: number;
  emotion?: string;
  text: string;
  // Where the pill sits on screen, the lifted copy starts from there
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SupportOverlayProps {
  target: SupportTarget | null;
  // Called once the overlay is gone, so the emotion changes after it settled
  onSend: (emotionId: number) => void;
  onClose: () => void;
  // The close animation finished, the emotion in the chat can show again
  onHidden: () => void;
}
